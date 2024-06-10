// categoryApiSlice.ts
import apiSlice from "../apiSlice";
import { TApiResponse } from "../types/TApiResponse.ts";
import { CATEGORY_URL } from "../endpoints.ts";
import { TCategory } from "../types/TCategory.ts";

const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<TApiResponse<TCategory[]>, void>({
      query: () => ({
        url: `${CATEGORY_URL}/`,
        method: "GET",
      }),
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
    }),
    deleteCategory: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `${CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
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
