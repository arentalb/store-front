import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/auth/authApiSlice.ts";
import { setCredentials } from "../../redux/auth/authSlice.ts";
import { RootState } from "../../redux/store.ts";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { FormInput } from "../../components/common/FormInput.tsx";
import { emailPattern, passwordMinLength } from "../../utils/validation";

interface LoginFormInputs {
  email: string;
  password: string;
}

export function LoginPage() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (credential) => {
    try {
      const res = await login(credential).unwrap();
      toast.success("Login succeeded");
      dispatch(setCredentials({ ...res.data }));
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  return (
    <div className={"py-20"}>
      <h1 className={"text-3xl font-bold mb-8"}>Login form</h1>

      <form
        className={"max-w-md flex flex-col gap-6"}
        onSubmit={handleSubmit(onSubmit)}
      >
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
          type="password"
          registration={register("password", {
            required: "Password is required",
            minLength: passwordMinLength,
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
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
        <button className="btn btn-neutral" disabled={isLoading} type="submit">
          {isLoading ? <Loader /> : "Login"}
        </button>
        <div className="text-center text-sm">
          <p>
            Don't have an account?{" "}
            <Link className="text-info hover:underline" to="/register">
              Register
            </Link>
          </p>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="mx-4 text-gray-600">OR</span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <p>
            Forgot your password?{" "}
            <Link
              className="text-info hover:underline"
              to="/reset-password-request"
            >
              Reset password
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
