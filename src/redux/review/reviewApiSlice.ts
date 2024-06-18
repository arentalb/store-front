import apiSlice from "../apiSlice.ts";
import { REVIEW_URL } from "../endpoints.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { REVIEW_TAG } from "../tags.ts";
import { TReview, TReviewRequest } from "../../types/TReview.ts";

const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllReview: builder.query<TApiResponse<TReview[]>, string>({
      query: (id) => ({
        url: `${REVIEW_URL}/${id}/reviews`,
        method: "GET",
      }),
      providesTags: [REVIEW_TAG],
    }),
    getSingleReview: builder.query<
      TApiResponse<TReview>,
      { productId: string; reviewId: string }
    >({
      query: ({ productId, reviewId }) => ({
        url: `${REVIEW_URL}/${productId}/reviews/${reviewId}`,
        method: "GET",
      }),
    }),
    hasReviewed: builder.query<TApiResponse<{ reviewed: boolean }>, string>({
      query: (productId) => ({
        url: `${REVIEW_URL}/${productId}/reviewed`,
        method: "GET",
      }),
      providesTags: [REVIEW_TAG],
    }),
    createReview: builder.mutation<TApiResponse<TReview>, TReviewRequest>({
      query: ({ newReview, productId }) => ({
        url: `${REVIEW_URL}/${productId}/reviews`,
        method: "POST",
        body: newReview,
      }),
      invalidatesTags: [REVIEW_TAG],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetSingleReviewQuery,
  useHasReviewedQuery,
} = productApiSlice;
