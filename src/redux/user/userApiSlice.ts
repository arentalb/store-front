import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { USERS_URL } from "../endpoints.ts";
import { TUser, TUserDetail } from "../../types/TUser.ts";
import { TPassword } from "../../pages/SharedPages/ProfilePage.tsx";
import { PROFILE_TAG } from "../../constants/TagTypes.ts";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query<TApiResponse<TUser>, void>({
      query: () => ({
        url: `${USERS_URL}/me`,
        method: "GET",
      }),
      providesTags: [PROFILE_TAG],
    }),
    updateProfile: builder.mutation<TApiResponse<TUser>, Partial<TUser>>({
      query: (data) => ({
        url: `${USERS_URL}/me`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [PROFILE_TAG],
    }),
    changePassword: builder.mutation<string, TPassword>({
      query: (data) => ({
        url: `${USERS_URL}/change-password`,
        method: "PUT",
        body: data,
      }),
    }),
    getUsers: builder.query<TApiResponse<TUserDetail[]>, void>({
      query: () => ({
        url: `${USERS_URL}/admin`,
        method: "GET",
      }),
    }),
    getUserDetail: builder.query<TApiResponse<TUser>, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<
      TApiResponse<TUser>,
      Partial<TUser> & { id: string }
    >({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useGetUsersQuery,
  useGetUserDetailQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApiSlice;

export default userApiSlice;
