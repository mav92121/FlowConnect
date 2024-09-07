"use client";
import React, { useState } from "react";
import { signInFlow } from "../types";
import SignInPage from "./sign-in-page";
import SignUpPage from "./sign-up-page";

const AuthScreen = () => {
  const [state, setState] = useState<signInFlow>("signIn");
  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px]">
        {state === "signIn" ? (
          <SignInPage setState={setState} />
        ) : (
          <SignUpPage setState={setState} />
        )}
      </div>
    </div>
  );
};

export default AuthScreen;
