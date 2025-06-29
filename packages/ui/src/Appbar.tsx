"use client"

import React from "react";
import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}



export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return (
  <div className="flex justify-between items-center border-b px-4 py-2 bg-[#0D47A1] text-white">
    <div className="text-xl hover:text-2xl transition-all duration-200 cursor-pointer">
      GoPay
    </div>
    <div>
      <Button onClick={user ? onSignout : onSignin} variant="inverted">
        {user ? "Logout" : "Login"}
      </Button>
    </div>
  </div>
)};