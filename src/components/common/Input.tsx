import React from "react";

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ label, name, value, onChange }: InputFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        type="text"
        name={name}
        className="input input-bordered w-full"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
