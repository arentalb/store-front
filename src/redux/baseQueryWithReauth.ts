import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logOut } from "./auth/authSlice.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 403) {
    // Attempt to get a new token
    const refreshResult = await baseQuery(
      { url: "/api/v1/auth/refresh", method: "GET" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // If refresh was successful, retry the original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      //
      // clear user state, redirect to login, etc.
      api.dispatch(logOut());
    }
  }

  return result;
};

export default baseQueryWithReauth;
