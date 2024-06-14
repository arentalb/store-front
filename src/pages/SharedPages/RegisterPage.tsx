import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRegisterMutation } from "../../redux/auth/authApiSlice.ts";
import { RootState } from "../../redux/store.ts";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { FormInput } from "../../components/common/FormInput.tsx";
import { Link, useNavigate } from "react-router-dom";
import {
  emailPattern,
  passwordMinLength,
  strongPasswordPattern,
} from "../../utils/validation.ts";

interface RegisterFormInputs {
  email: string;
  username: string;
  password: string;
}

export function RegisterPage() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const [registerMutation, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (newUser) => {
    try {
      await registerMutation(newUser).unwrap();
      toast.success("User registered");
      navigate("/login");
      reset();
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  return (
    <div className={"py-20"}>
      <h1 className={"text-2xl font-bold mb-8"}>Register form</h1>
      <form className={"max-w-md flex flex-col gap-4"}>
        <FormInput
          type="email"
          registration={register("email", {
            required: "Email is required",
            pattern: emailPattern,
          })}
          error={errors.email}
          placeHolder="Enter your email"
          id="username"
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

        <FormInput
          type="password"
          registration={register("password", {
            required: "Password is required",
            minLength: passwordMinLength,
            pattern: strongPasswordPattern,
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

        <button
          className="btn btn-neutral"
          disabled={isLoading}
          type={"button"}
          onClick={handleSubmit(onSubmit)}
        >
          {isLoading ? <Loader /> : "Register"}
        </button>
        <p className={"text-center text-sm"}>
          Already have an account?{" "}
          <Link className={"text-info hover:underline"} to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
