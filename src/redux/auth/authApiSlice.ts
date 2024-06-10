import { AUTH_URL } from "../endpoints.ts";
import apiSlice from "../apiSlice";
import { ApiResponse } from "../types/TApiResponse.ts";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
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
    login: builder.mutation<ApiResponse<User>, LoginRequest>({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `${AUTH_URL}/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<ApiResponse<string>, RegisterRequest>({
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
