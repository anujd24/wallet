"use client"

import React, { JSX } from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: React.ReactNode;
  className?: string;
}): JSX.Element {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-200 p-4${className}`}
    >
      <h1 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        {title}
      </h1>
      {children}
    </div>
  );
}
