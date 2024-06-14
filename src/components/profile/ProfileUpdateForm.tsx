import { SubmitHandler, useForm } from "react-hook-form";
import { Loader } from "../common/Loader.tsx";
import { FormInput } from "../common/FormInput.tsx";
import { emailPattern } from "../../utils/validation.ts";

export interface TProfile {
  username: string;
  email: string;
}

interface ProfileUpdateFormProps {
  initialValues: TProfile;
  onSubmit: SubmitHandler<TProfile>;
  isLoading: boolean;
}

export function ProfileUpdateForm({
  initialValues,
  onSubmit,
  isLoading,
}: ProfileUpdateFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProfile>({
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-4"}>
      <FormInput
        type="email"
        registration={register("email", {
          required: "Email is required",
          pattern: emailPattern,
        })}
        error={errors.email}
        placeHolder="Enter your email"
        id="email"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
        }
      />

      <FormInput
        type="text"
        registration={register("username", {
          required: "Username is required",
        })}
        error={errors.username}
        placeHolder="Enter your username"
        id="username"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
        }
      />

      <button className="btn btn-neutral" disabled={isLoading} type="submit">
        {isLoading ? <Loader /> : "Update"}
      </button>
    </form>
  );
}
