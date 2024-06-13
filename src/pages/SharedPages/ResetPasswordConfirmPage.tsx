import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { FormInput } from "../../components/common/FormInput.tsx";
import { useResetPasswordConfirmMutation } from "../../redux/auth/authApiSlice.ts";
import { useLocation, useNavigate } from "react-router-dom";

interface ResetPasswordFormInputs {
  password: string;
}

export function ResetPasswordConfirmPage() {
  const [resetPasswordConfirm, { isLoading }] =
    useResetPasswordConfirmMutation();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormInputs>();

  const onSubmit: SubmitHandler<ResetPasswordFormInputs> = async (data) => {
    if (!token) {
      toast.error("Invalid or missing token.");
      return;
    }

    try {
      await resetPasswordConfirm({ password: data.password, token }).unwrap();
      toast.success("Password reset successful. Please log in.");
      navigate("/login");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  return (
    <div className="py-20">
      <h1 className="text-3xl font-bold mb-8">Update password</h1>

      <form
        className="max-w-md flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormInput
          type="password"
          registration={register("password", {
            required: "Password is required",
          })}
          error={errors.password}
          placeHolder="Enter your password"
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

        <button className="btn btn-neutral" disabled={isLoading} type="submit">
          {isLoading ? <Loader /> : "Update password"}
        </button>
      </form>
    </div>
  );
}
