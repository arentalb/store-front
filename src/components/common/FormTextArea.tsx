import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormTextAreaProps {
  label?: string;
  registration: UseFormRegisterReturn;
  placeHolder?: string;
  error?: FieldError;
  id?: string;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  rows?: number;
  className?: string;
}

export function FormTextArea({
  label,
  registration,
  error,
  placeHolder,
  id,
  required,
  disabled,
  maxLength,
  rows = 4,
  className,
}: FormTextAreaProps) {
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
      <textarea
        id={id}
        placeholder={placeHolder}
        className="textarea textarea-bordered w-full"
        {...registration}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        rows={rows}
      ></textarea>
      {error && <p className="text-error text-sm mt-2">{error.message}</p>}
    </div>
  );
}
