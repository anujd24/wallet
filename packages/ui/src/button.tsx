"use client";

import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "inverted"; // ✅ variant support
  disabled?: boolean;
}

export const Button = ({
  onClick,
  children,
  disabled = false,
  className = "",
  variant = "primary", // default to primary
  ...rest
}: ButtonProps) => {
  const baseClasses =
    "transition font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 cursor-pointer";
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
  
  const variantClasses =
    variant === "inverted"
      ? "bg-white text-blue-600 border border-white hover:bg-transparent hover:text-white cursor-pointer"
      : "bg-blue-600 text-white hover:bg-blue-700";

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${disabledClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
