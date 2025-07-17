import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
// import Github from "next-auth/providers/github"
import jwt from "jsonwebtoken"
import router from "next/router";
import { auth } from './auth-middleware'; // Remove .ts extension


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({
    credentials: {
        email: {},
        password: {},
    },
    authorize: async (credentials) => {

      try {
        let response = await fetch("http://localhost:5001/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
          
        });
        let data = await response.json();

        if (!response.ok) 
          throw new Error(data.message)
        console.log(data)
        
        return data;
      } catch (error:any) {
        throw new Error(error.message)
      }
        
        },
        
      
  }),
  Google({
    clientId: process.env.auth_google_id as string,
    clientSecret: process.env.Auth_GOOGLE_SECRET as string,
    profile: async (profile) => {
      console.log("profile",profile)
      return {
        profile
      };
    },
  }),
    
  ],
  session: {
    strategy: "jwt",

  },
  secret: process.env.AUTH_SECRET,
  // First Aprroch in this approch we change the way token encoded where we need id (change the token)
  // jwt: {
  //   async encode(params) {
  //     return jwt.sign(
  //       { id: params.token?.id } as any,
  //       process.env.AUTH_SECRET as string
  //     );
  //   },
  //   async decode(params) {
  //     return jwt.verify(
  //       params.token as any, 
  //       process.env.AUTH_SECRET as string
  //     ) as any;
  //   },
  // },
  // // in this approch we keep the token and we add another one that we get from backend
  // callbacks: {
  //   jwt({token, user})  {
  //     if (user) token.id = user.id; // if user exists pass id to token
  //     return token;
  //   },
  // },

// Second Approch
  jwt: {
    async encode(params) {
      return jwt.sign(
        { id: params.token?.id } as any,
        process.env.AUTH_SECRET as string
      );
    },
    async decode(params) {
      return jwt.verify(
        params.token as any, 
        process.env.AUTH_SECRET as string
      ) as any;
    },
  },
  // in this approch we keep the token and we add another one that we get from backend
  callbacks: {
    jwt({token, user, profile})  {
      console.log("profile",profile, "user", user)
      if (user) {
        token.id = user.id; // if user exists pass id to token
        token.accessToken = user.token;
      }
      return token;
    },
    session({session, token}: any) {
      console.log("token",token)
      session.accessToken = token.accessToken;
      session.id = token.id;
      return session;
    },
  },
});


function loginUserInBackend(email:string, password:string){
    if (email == "omar@gmail.com" ) return { data: { email }, token:""};
    return null;
}
