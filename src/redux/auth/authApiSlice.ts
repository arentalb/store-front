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
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authSlice;
