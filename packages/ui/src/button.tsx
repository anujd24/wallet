"use client";

import React, { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean; // Add disabled prop
}

export const Button = ({ onClick, children, disabled = false, className = "", ...rest }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`cursor-pointer text-white bg-black hover:bg-gray-200 hover:text-black font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};