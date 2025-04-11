"use client";

import React from "react";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className=" cursor-pointer text-white bg-black hover:bg-gray-200 hover:text-black  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};
