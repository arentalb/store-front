import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  type: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

export function FormInput({
  label,
  type,
  registration,
  error,
}: FormInputProps) {
  return (
    <label className="form-control w-full sm:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        className="input input-bordered w-full sm:max-w-xs"
        {...registration}
      />
      {error && <p className="text-red-500">{error.message}</p>}
    </label>
  );
}
