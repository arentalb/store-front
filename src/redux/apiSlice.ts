import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CART_TAG,
  CATEGORY_TAG,
  ORDER_TAG,
  PRODUCT_TAG,
  PROFILE_TAG,
  USER_TAG,
} from "./tags.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  credentials: "include",
});

const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: [
    PRODUCT_TAG,
    ORDER_TAG,
    CATEGORY_TAG,
    USER_TAG,
    PROFILE_TAG,
    CART_TAG,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
