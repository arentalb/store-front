import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { FormInput } from "../../components/common/FormInput.tsx";
import { useResetPasswordRequestMutation } from "../../redux/auth/authApiSlice.ts";

interface LoginFormInputs {
  email: string;
}

export function ResetPasswordRequestPage() {
  const [resetPasswordRequest, { isLoading }] =
    useResetPasswordRequestMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (credential) => {
    try {
      await resetPasswordRequest(credential).unwrap();
      toast.success(
        `We send a reset password link to your email ${getValues("email")}`,
      );
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  return (
    <div className={"py-20"}>
      <h1 className={"text-3xl font-bold mb-8"}>Reset password</h1>

      <form className={"max-w-md flex flex-col gap-6"}>
        <FormInput
          type="email"
          registration={register("email", {
            required: "Email is required",
          })}
          error={errors.email}
          placeHolder="Enter your email"
          id="password"
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

        <button
          className="btn btn-neutral"
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          type={"button"}
        >
          {isLoading ? <Loader /> : "Send reset link"}
        </button>
      </form>
    </div>
  );
}
