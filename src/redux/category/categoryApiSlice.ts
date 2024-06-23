import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { CATEGORY_URL } from "../endpoints.ts";
import { TCategory } from "../../types/TCategory.ts";
import { CATEGORY_TAG } from "../tags.ts";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TApiResponse<TCategory[]>, void>({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        method: "GET",
      }),
      providesTags: [CATEGORY_TAG],
    }),
    createCategory: builder.mutation<
      TApiResponse<TCategory>,
      Partial<TCategory>
    >({
      query: (category) => ({
        url: `${CATEGORY_URL}/`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: [CATEGORY_TAG],
    }),
    updateCategory: builder.mutation<
      TApiResponse<TCategory>,
      { id: string; name: string }
    >({
      query: ({ id, name }) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: [CATEGORY_TAG],
    }),
    deleteCategory: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [CATEGORY_TAG],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
