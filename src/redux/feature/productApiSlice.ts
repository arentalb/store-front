import apiSlice from "../apiSlice";
import { PRODUCT_URL } from "../endpoints";
import { TApiResponse } from "../types/TApiResponse.ts";
import { TProduct } from "../types/TProduct.ts";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<TApiResponse<TProduct[]>, string | undefined>({
      query: (category) => ({
        url: category
          ? `${PRODUCT_URL}?category=${category}`
          : `${PRODUCT_URL}`,
        method: "GET",
      }),
    }),
    getProductById: builder.query<TApiResponse<TProduct>, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "GET",
      }),
    }),
    getNewProducts: builder.query<TApiResponse<TProduct[]>, void>({
      query: () => ({
        url: `${PRODUCT_URL}/new`,
        method: "GET",
      }),
    }),
    createProduct: builder.mutation<TApiResponse<TProduct>, Partial<TProduct>>({
      query: (product) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: product,
      }),
    }),
    updateProduct: builder.mutation<
      TApiResponse<TProduct>,
      { product: Partial<TProduct>; id: string }
    >({
      query: ({ product, id }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: product,
      }),
    }),
    deleteProduct: builder.mutation<TApiResponse<null>, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
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
