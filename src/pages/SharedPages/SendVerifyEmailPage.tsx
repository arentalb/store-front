import { useSelector } from "react-redux";
import { getUser } from "../../redux/auth/authSlice.ts";
import { useSendEmailVerificationMutation } from "../../redux/auth/authApiSlice.ts";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";

export function SendVerifyEmailPage() {
  const user = useSelector(getUser);

  const [sendEmailVerification, { isLoading }] =
    useSendEmailVerificationMutation();
  const handleResendClick = async () => {
    try {
      if (user?.email) {
        await sendEmailVerification({ email: user.email });
      }
      toast.success("We have sent a verification link to your email address.");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(
        apiError.data.message ||
          "There was an error sending the verification email. Please try again.",
      );
    }
  };

  return (
    <div className={"flex justify-center mt-20"}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Verify Your Email
        </h1>
        {user?.email && (
          <p className="text-blue-500 text-center font-medium mb-6">
            {user.email}
          </p>
        )}
        <p className="text-gray-600 text-center">
          Click the button below to receive a verification link.
        </p>
        <button
          onClick={handleResendClick}
          disabled={isLoading}
          className={`btn btn-primary mt-8`}
        >
          {isLoading ? "Sending..." : "Send Verification Email"}
        </button>
      </div>
    </div>
  );
}
