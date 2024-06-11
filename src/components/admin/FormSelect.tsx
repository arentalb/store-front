import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface FormSelectProps {
  label: string;
  registration: UseFormRegisterReturn;
  options: { value: string; label: string }[];
  error?: FieldError;
}

export function FormSelect({
  label,
  registration,
  options,
  error,
}: FormSelectProps) {
  return (
    <label className="form-control w-full sm:max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select className="select select-bordered" {...registration}>
        <option disabled defaultChecked value="">
          Pick one
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500">{error.message}</p>}
    </label>
  );
}
