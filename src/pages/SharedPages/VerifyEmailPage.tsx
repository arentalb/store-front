import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { updateVerificationStatus } from "../../redux/auth/authSlice.ts";
import { useConfirmEmailVerificationMutation } from "../../redux/auth/authApiSlice.ts";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";

export function VerifyEmailPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [confirmEmailVerification] = useConfirmEmailVerificationMutation();

  useEffect(() => {
    const verifyEmail = async () => {
      const searchParams = new URLSearchParams(location.search);
      const token = searchParams.get("token");

      if (token) {
        try {
          await confirmEmailVerification({ token }).unwrap();
          dispatch(updateVerificationStatus());
          toast.success(`Email verified`);
          navigate("/");
        } catch (error) {
          const appError = error as TApiError;
          toast.error(`Verification failed: ${appError.data.message}`);
        }
      }
    };

    verifyEmail();
  }, [confirmEmailVerification, dispatch, location.search, navigate]);

  return <Loader />;
}
