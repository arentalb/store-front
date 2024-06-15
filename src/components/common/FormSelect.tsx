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
    <div className="form-control w-full  w-full">
      <label className="label text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
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
      {error && <p className="text-error text-sm mt-2">{error.message}</p>}
    </div>
  );
}
