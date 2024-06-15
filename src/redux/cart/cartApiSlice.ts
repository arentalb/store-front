import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { CART_TAG, PRODUCT_TAG } from "../tags.ts";
import { CART_URL } from "../endpoints.ts";
import { TCart, TCartItem } from "../../types/TCart.ts";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<TApiResponse<TCart>, void>({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
      }),
      providesTags: [CART_TAG],
    }),
    addToCart: builder.mutation<
      TApiResponse<TCartItem>,
      { productId: string; quantity: number }
    >({
      query: (item) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: item,
      }),
      invalidatesTags: [CART_TAG, PRODUCT_TAG],
    }),
    updateCartItem: builder.mutation<
      TApiResponse<TCartItem>,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `${CART_URL}`,
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: [CART_TAG, PRODUCT_TAG],
    }),
    removeCartItem: builder.mutation<TApiResponse<void>, string>({
      query: (productId) => ({
        url: `${CART_URL}/item`,
        method: "DELETE",
        body: { productId },
      }),
      invalidatesTags: [CART_TAG, PRODUCT_TAG],
    }),
    removeEntireCart: builder.mutation<TApiResponse<void>, void>({
      query: () => ({
        url: `${CART_URL}`,
        method: "DELETE",
      }),
      invalidatesTags: [CART_TAG, PRODUCT_TAG],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useRemoveEntireCartMutation,
} = cartApiSlice;
