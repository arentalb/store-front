import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { ReactNode } from "react";

interface FormFileInputProps {
  label?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  className?: string;
  previews?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormFileInput({
  label,
  registration,
  error,
  id,
  required,
  disabled,
  accept,
  multiple,
  className,
  previews,
  onChange,
}: FormFileInputProps) {
  return (
    <div className={`form-control w-full ${className}`}>
      {label && (
        <label
          className="label text-gray-700 text-sm font-bold mb-2"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type="file"
        id={id}
        className="file-input file-input-bordered w-full"
        {...registration}
        required={required}
        disabled={disabled}
        accept={accept}
        multiple={multiple}
        onChange={onChange}
      />
      {error && <p className="text-error text-sm mt-2">{error.message}</p>}
      {previews}
    </div>
  );
}
