import { AUTH_URL } from "../endpoints.ts";
import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { CART_TAG, ORDER_TAG, PRODUCT_TAG, PROFILE_TAG } from "../tags.ts";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

interface verifyRequest {
  email: string;
}

interface confirmVerifyRequest {
  token: string;
}

interface resetRequest {
  email: string;
}

interface resetConfirmRequest {
  password: string;
  token: string;
}

export interface User {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
  accessToken: string;
  refreshToken: string;
}

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TApiResponse<User>, LoginRequest>({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PROFILE_TAG, CART_TAG, PRODUCT_TAG, ORDER_TAG],
    }),
    logout: builder.mutation<TApiResponse<null>, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: [PROFILE_TAG, CART_TAG, PRODUCT_TAG, ORDER_TAG],
    }),
    register: builder.mutation<TApiResponse<string>, RegisterRequest>({
      query: (data) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        body: data,
      }),
    }),
    sendEmailVerification: builder.mutation<
      TApiResponse<string>,
      verifyRequest
    >({
      query: (data) => ({
        url: `${AUTH_URL}/verify-email/request`,
        method: "POST",
        body: data,
      }),
    }),
    confirmEmailVerification: builder.mutation<
      TApiResponse<string>,
      confirmVerifyRequest
    >({
      query: ({ token }) => ({
        url: `${AUTH_URL}/verify-email/confirm?token=${token}`,
        method: "GET",
      }),
    }),
    resetPasswordRequest: builder.mutation<TApiResponse<string>, resetRequest>({
      query: (data) => ({
        url: `${AUTH_URL}/password-reset/request`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordConfirm: builder.mutation<
      TApiResponse<string>,
      resetConfirmRequest
    >({
      query: ({ password, token }) => ({
        url: `${AUTH_URL}/password-reset/confirm?token=${token}`,
        method: "POST",
        body: { password: password },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useSendEmailVerificationMutation,
  useResetPasswordConfirmMutation,
  useResetPasswordRequestMutation,
  useConfirmEmailVerificationMutation,
} = authSlice;
