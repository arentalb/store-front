import { createApi } from "@reduxjs/toolkit/query/react";
import {
  CART_TAG,
  CATEGORY_TAG,
  ORDER_TAG,
  PRODUCT_TAG,
  PROFILE_TAG,
  USER_TAG,
} from "./tags.ts";
import baseQueryWithReauth from "./baseQueryWithReauth.ts";

const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
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
