"use client"

import React from "react";


type TextInputProps = {
    placeholder: string;
    onChange: (value: string) => void;
    label?: string;
    type?: string;  // Make optional with default value
    value? : any;
    className?: string;
};

export const TextInput = ({
    placeholder,
    onChange,
    label,
    type = "text"  // Default to "text" if not provided
}: TextInputProps) => {
    return (
        <div className="pt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">
                {label}
            </label>
            <input
                onChange={(e) => onChange(e.target.value)}
                type={type}  // Use the type prop
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder={placeholder}
            />
        </div>
    );
};