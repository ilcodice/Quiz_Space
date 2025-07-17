import { redirect } from "next/navigation";
import react from "react";
import { isAuthenticated } from "@/actions/auth";

export default async function page() {
    let isAuth = await isAuthenticated();
    if (!isAuth) return <div>Unauthorized</div>;
    return <div>Protected Page</div>;
}