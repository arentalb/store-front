import { AUTH_URL } from "../endpoints.ts";
import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";

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

interface resetRequest {
  email: string;
}

interface resetConfirmRequest {
  password: string;
  token: string;
}

interface User {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<TApiResponse<User>, LoginRequest>({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<TApiResponse<null>, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
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
} = authSlice;
