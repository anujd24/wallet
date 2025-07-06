"use client"

import { ReactNode } from "react";

type TextInputProps = {
    placeholder: string;
    onChange: (value: string) => void;
    label?: ReactNode;
    type?: string;
    value?: string;  // Changed from 'any' to 'string' for type safety
    className?: string;
    children?: ReactNode;  // Added to satisfy ReactNode requirements
};

export const TextInput = ({
    placeholder,
    onChange,
    label,
    type = "text",
    value,
    className
}: TextInputProps) => {
    return (
        <div className={`pt-2 ${className}`}>
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900">
                    {label}
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