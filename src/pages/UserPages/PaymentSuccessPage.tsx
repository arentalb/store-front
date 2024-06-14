import { Loader } from "../../components/common/Loader.tsx";
import { useEffect } from "react";
import { useUpdateOrderToPaidMutation } from "../../redux/payment/paymentApiSlice.ts";
import { Link, useLocation } from "react-router-dom";
import { TApiError } from "../../types/TApiError.ts";
import { toast } from "react-toastify";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";

export function PaymentSuccessPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");
  const orderId = queryParams.get("order_id");

  const [updateOrderToPaid, { isLoading, isError }] =
    useUpdateOrderToPaidMutation();

  useEffect(() => {
    const updateOrder = async () => {
      try {
        if (sessionId && orderId) {
          await updateOrderToPaid({ sessionId, orderId }).unwrap();
          toast.success("Order updated successfully!");
        }
      } catch (error) {
        const apiError = error as TApiError;
        toast.error(`Failed to update the order: ${apiError.data.message}`);
      }
    };

    updateOrder();
  }, [sessionId, orderId, updateOrderToPaid]);

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <ErrorMessage
        message={"Failed to update the order , please contact us "}
      />
    );

  return (
    <div className={"flex justify-center mt-20 text-center"}>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-4">Payment Successful</h1>
        <p className="text-gray-700">
          Thank you for your purchase! Your order has been updated successfully.
        </p>
        <Link to={"/products"} className={"btn btn-primary mt-8"}>
          Discover more
        </Link>
      </div>
    </div>
  );
}
