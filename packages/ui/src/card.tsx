"use client"

import { ReactNode } from "react";

export function Card({
  title,
  children,
  className = "",
}: {
  title: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`bg-white rounded-2xl shadow-md border border-gray-200 p-4 w-full${className}`}
    >
      <h1 className="text-lg font-semibold text-blue-900 border-b pb-2 mb-4">
        {title}
      </h1>
      {children}
    </div>



  );
}
