import apiSlice from "../apiSlice.ts";
import {
  TStripeSession,
  UpdateOrderToPaidInput,
  UpdateOrderToPaidResponse,
} from "../../types/TStrip.ts";
import { PAYMENT_URL } from "../endpoints.ts";

export const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<TStripeSession, string>({
      query: (orderId) => ({
        url: `${PAYMENT_URL}/checkout-session`,
        method: "POST",
        body: { orderId },
      }),
    }),
    updateOrderToPaid: builder.mutation<
      UpdateOrderToPaidResponse,
      UpdateOrderToPaidInput
    >({
      query: ({ sessionId, orderId }) => ({
        url: `${PAYMENT_URL}/success?session_id=${sessionId}&order_id=${orderId}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useCreateCheckoutSessionMutation,
  useUpdateOrderToPaidMutation,
} = paymentApiSlice;
