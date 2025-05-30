"use client";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import React from "react";
import { useAuth } from "@/context/AuthContext";

const LogoutBtn = ({ className }: { className?: string }) => {
  const {logout} = useAuth()
  return (
    <Button
      onClick={() => {
        logout();
      }}
      variant={"ghost"}
      className={cn("flex", className)}
    >
      <LogOut  className="text-red-400"/>
      <h1>Logout</h1>
    </Button>
  );
};

export default LogoutBtn;
