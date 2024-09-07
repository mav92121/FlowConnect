"use client";
import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";
import React from "react";

const Home = () => {
  const { signOut } = useAuthActions();
  return (
    <div>
      Logged In
      <div>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </div>
    </div>
  );
};

export default Home;
