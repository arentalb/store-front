import apiSlice from "../apiSlice.ts";
import { PRODUCT_URL } from "../endpoints.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { TProduct } from "../../types/TProduct.ts";
import { PRODUCT_TAG } from "../tags.ts";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<TApiResponse<TProduct[]>, void>({
      query: () => ({
        url: `${PRODUCT_URL}`,
        method: "GET",
      }),
      providesTags: [PRODUCT_TAG],
    }),
    getProductById: builder.query<TApiResponse<TProduct>, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [PRODUCT_TAG],
    }),
    getNewProducts: builder.query<TApiResponse<TProduct[]>, void>({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<TApiResponse<TProduct>, FormData>({
      query: (formData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
    updateProduct: builder.mutation<
      TApiResponse<TProduct>,
      { product: FormData; id: string }
    >({
      query: ({ product, id }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: product,
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
    deleteProduct: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [PRODUCT_TAG],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetNewProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApiSlice;
