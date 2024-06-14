import { SubmitHandler, useForm } from "react-hook-form";
import { Loader } from "../common/Loader.tsx";
import { FormInput } from "../common/FormInput.tsx";
import {
  passwordMinLength,
  strongPasswordPattern,
} from "../../utils/validation.ts";

export interface TPassword {
  oldPassword: string;
  newPassword: string;
}

interface PasswordChangeFormProps {
  onSubmit: SubmitHandler<TPassword>;
  isLoading: boolean;
}

export function PasswordChangeForm({
  onSubmit,
  isLoading,
}: PasswordChangeFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TPassword>();

  const handleFormSubmit: SubmitHandler<TPassword> = async (passwords) => {
    await onSubmit(passwords);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={"flex flex-col gap-4"}
    >
      <FormInput
        type="password"
        registration={register("oldPassword", {
          required: "Old Password is required",
        })}
        error={errors.oldPassword}
        placeHolder="Enter your old password"
        id="oldPassword"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <FormInput
        type="password"
        registration={register("newPassword", {
          required: "New Password is required",
          minLength: passwordMinLength,
          pattern: strongPasswordPattern,
        })}
        error={errors.newPassword}
        placeHolder="Enter your new password"
        id="newPassword"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <button className="btn btn-neutral " disabled={isLoading} type="submit">
        {isLoading ? <Loader /> : "Change Password"}
      </button>
    </form>
  );
}
