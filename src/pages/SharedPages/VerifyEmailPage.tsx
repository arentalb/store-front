import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateVerificationStatus } from "../../redux/auth/authSlice.ts";

export function VerifyEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateVerificationStatus());

    navigate("/");
  }, [dispatch, navigate]);

  return (
    <div className={"flex justify-center mt-20"}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">
          Your email has been verified
        </h1>
        <p className="text-gray-700">
          Thank you for verifying your email address.
        </p>
      </div>
    </div>
  );
}
