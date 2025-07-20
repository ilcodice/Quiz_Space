"use client";
import React from "react";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <button
      onClick={() => signIn()}
      className="btn btn-primary"
    >
      Sign In
    </button>
  );
}
