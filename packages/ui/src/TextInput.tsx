"use client"

import React, { ReactNode } from 'react';

interface TextInputProps {
  placeholder: string;
  onChange: (value: string) => void;
  label?: ReactNode; // Correct type for label
  type?: string;
  value?: string;
  className?: string;
  children?: never; // Explicitly mark as never accepting children
}

export const TextInput = ({
  placeholder,
  onChange,
  label,
  type = "text",
  value,
  className
}: TextInputProps) => {
  return (
    <div className={`pt-2 ${className || ''}`}>
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-900">
          {/* Safe render for any ReactNode */}
          {typeof label === 'string' ? label : React.isValidElement(label) ? label : null}
        </label>
      )}
      <input
        onChange={(e) => onChange(e.target.value)}
        type={type}
        value={value}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        placeholder={placeholder}
      />
    </div>
  );
};