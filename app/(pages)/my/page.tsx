import { logout, login, signup, isAuthenticated } from "@/actions/auth.ts";
import { Button } from "@/components/ui/button";

export default async function Navbar() {
  let isAuth = await isAuthenticated();
  console.log(isAuth);

  return (
    <div className="py-8 shadow">
      <nav className="container mx-auto flex gap-5">
        {isAuth ? (
          <form action={logout}>
            <Button variant="destructive">Logout</Button>
          </form>
        ) : (
          <form action={login}>
            <Button>Signin</Button>
          </form>
        )}
        <form action={signup}>
          <Button>Signup</Button>
        </form>
      </nav>
    </div>
  );
}
