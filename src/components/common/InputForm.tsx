import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import React from "react";

interface InputFormProps {
  label?: string;
  type: string;
  registration: UseFormRegisterReturn;
  placeHolder?: string;
  error?: FieldError;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  autoComplete?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function InputForm({
  label,
  type,
  registration,
  error,
  placeHolder,
  id,
  required,
  disabled,
  maxLength,
  autoComplete,
  className,
  icon,
}: InputFormProps) {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <label className="input input-bordered flex items-center gap-2">
        {icon && <span className="flex items-center ">{icon}</span>}
        <input
          type={type}
          id={id}
          placeholder={placeHolder}
          className="grow"
          {...registration}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          autoComplete={autoComplete}
        />
      </label>
      {error && <p className="text-error text-sm">{error.message}</p>}
    </div>
  );
}
