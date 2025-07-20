"use server"

import { auth, signIn, signOut } from "../auth";

export const signup = async () => {};

export const login = async () => {
    await signIn("credentials", {
        
    email: "shiar@gmail.com",
    password: "Shiar1234",
    redirectTo: "/",
    });
};


// if singin successful with google go to "/"
export const loginWithGoogle = async () => {
    await signIn("google", {redirectTo: "/"});

};

export const logout = async () => {
    await signOut({ redirectTo: "/" });
};


//if the user is loged in it will return data else it will return undefined 
export const isAuthenticated = async () => {
    let session = await auth();
    console.log("session",session)
    return session?.user; 
};


