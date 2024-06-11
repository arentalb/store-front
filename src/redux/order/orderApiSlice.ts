import {ORDER_URL} from "../endpoints.ts";
import apiSlice from "../apiSlice";
import {TApiResponse} from "../../types/TApiResponse.ts";
import {TOrder, TShippingAddress} from "../../types/TOrder.ts";
import {CART_TAG, ORDER_TAG} from "../tags.ts";

// src/redux/api/orderApiSlice.ts

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // admin section
    getOrders: builder.query<TApiResponse<TOrder[]>, void>({
      query: () => ({
        url: `${ORDER_URL}/all`,
        method: "GET",
      }),
      providesTags: [ORDER_TAG],
    }),
    getOrderDetail: builder.query<TApiResponse<TOrder>, string>({
      query: (id) => ({
        url: `${ORDER_URL}/detail/${id}`,
        method: "GET",
      }),
      providesTags: [ORDER_TAG],
    }),
    updateOrderStatus: builder.mutation<
      void,
      { id: string; updateData: Partial<TOrder> }
    >({
      query: ({ id, updateData }) => ({
        url: `${ORDER_URL}/${id}`,
        method: "PUT",
        body: updateData,
      }),
      invalidatesTags: [ORDER_TAG],
    }),
    // user section
    getUserOrders: builder.query<TApiResponse<TOrder[]>, void>({
      query: () => ({
        url: `${ORDER_URL}`,
        method: "GET",
      }),
    }),
    getUserOrderDetail: builder.query<TApiResponse<TOrder>, string>({
      query: (id) => ({
        url: `${ORDER_URL}/${id}`,
        method: "GET",
      }),
    }),
    createUserOrder: builder.mutation<TApiResponse<TOrder>, TShippingAddress>({
      query: (shippingAddress) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: { shippingAddress },
      }),
      invalidatesTags: [CART_TAG, ORDER_TAG],
    }),
  }),
});

export const {
  // admin
  useGetOrdersQuery,
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
  // user
  useCreateUserOrderMutation,
  useGetUserOrdersQuery,
  useGetUserOrderDetailQuery,
} = orderApiSlice;