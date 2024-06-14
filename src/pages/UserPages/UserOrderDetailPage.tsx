import { useParams } from "react-router-dom";
import { useGetUserOrderDetailQuery } from "../../redux/order/orderApiSlice.ts";
import { useCreateCheckoutSessionMutation } from "../../redux/payment/paymentApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrderDetailsTable } from "../../components/common/OrderDetailsTable.tsx";
import { OrderItemsTable } from "../../components/common/OrderItemsTable.tsx";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { loadStripe } from "@stripe/stripe-js";
import { ShippingAddressTable } from "../../components/common/ShippingAddressTable.tsx";

export function UserOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: orderResponse,
    error: orderError,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetUserOrderDetailQuery(id!);

  const order: TOrder | undefined = orderResponse?.data;

  const [createCheckoutSession, { isLoading: isSessionLoading }] =
    useCreateCheckoutSessionMutation();

  const handlePayButtonClick = async () => {
    if (!order) return;

    try {
      const { sessionId } = await createCheckoutSession(order._id).unwrap();
      console.log("Checkout Session ID:", sessionId);

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

      if (!stripe) {
        console.error("Stripe initialization failed");
        return;
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error("Stripe checkout error:", error);
      }
    } catch (error) {
      console.error("Failed to create checkout session:", error);
    }
  };

  if (isOrderLoading) return <Loader />;

  if (isOrderError) {
    const apiError = orderError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching order"
        }
      />
    );
  }

  if (!order) {
    return <ErrorMessage message={"No order available "} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      {order && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>

          <OrderDetailsTable order={order} />
          <ShippingAddressTable order={order} />
          <OrderItemsTable order={order} />

          {order.isPaid ? (
            ""
          ) : (
            <button
              className="btn btn-primary"
              onClick={handlePayButtonClick}
              disabled={isSessionLoading}
            >
              {isSessionLoading ? "Processing..." : "Pay it"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
