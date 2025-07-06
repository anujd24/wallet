"use client"

import { ReactNode } from "react";

type SelectOption = {
  key: string;
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  onSelect: (value: string) => void;
  children?: ReactNode; // Add this to satisfy React's requirements
  className?: string;
};

export const Select = ({
  options,
  onSelect,
  className
}: SelectProps) => {
  return (
    <select
      onChange={(e) => onSelect(e.target.value)}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${className || ''}`}
    >
      {options.map((option) => (
        <option key={option.key} value={option.value}>
          {option.key}
        </option>
      ))}
    </select>
  );
};