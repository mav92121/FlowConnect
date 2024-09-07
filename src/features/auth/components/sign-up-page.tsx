"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signInFlow } from "../types";
import { useAuthActions } from "@convex-dev/auth/react";
import { TriangleAlert } from "lucide-react";

interface SignInProps {
  setState: (state: signInFlow) => void;
}
const SignUpPage = ({ setState }: SignInProps) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { signIn } = useAuthActions();
  const onPasswordSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    signIn("password", { name, email, password, flow: "signUp" })
      .catch(() => {
        setError("Invalid email or password");
      })
      .finally(() => {
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      });
  };
  const handleSignUp = (value: "github" | "google") => {
    signIn(value);
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle> Sign up to continue</CardTitle>
        <CardDescription>
          Use your email or other service to continue
        </CardDescription>
      </CardHeader>
      {!!error && (
        <div className="bg-destructive/15 flex gap-4 text-sm text-destructive mb-6 p-3 rounded-md">
          <TriangleAlert className=" size-4 " />
          <p>{error}</p>
        </div>
      )}
      <CardContent className=" space-y-5 px-0 pb-0">
        <form onSubmit={onPasswordSignUp} action="" className="space-y-2.5">
          <Input
            disabled={false}
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Name"
            type="name"
            required
          />
          <Input
            disabled={false}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={false}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={false}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            placeholder="Confirm password"
            type="password"
            required
          />
          <Button
            onClick={() => {
              console.log("email -> ", email);
              console.log("pass -> ", password);
              console.log("confirm -> ", confirmPassword);
            }}
            type="submit"
            className="w-full"
            size="lg"
            disabled={false}
          >
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            className="w-full relative"
            disabled={false}
            onClick={() => handleSignUp("google")}
            variant="outline"
            size="lg"
          >
            <FcGoogle className="size-5 absolute top-2.5 left-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            disabled={false}
            onClick={() => handleSignUp("github")}
            variant="outline"
            size="lg"
          >
            <FaGithub className="size-5 absolute top-2.5 left-2.5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an Account?
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpPage;
