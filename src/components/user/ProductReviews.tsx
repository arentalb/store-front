import {
  useCreateReviewMutation,
  useGetAllReviewQuery,
} from "../../redux/review/reviewApiSlice.ts";
import { Loader } from "../common/Loader.tsx";
import { TApiError } from "../../types/TApiError.ts";
import { ErrorMessage } from "../common/ErrorMessage.tsx";
import { EmptyMessage } from "../common/EmptyMessage.tsx";
import { RatingStar } from "./RatingStar.tsx";
import { useState } from "react";
import { toast } from "react-toastify";
import { Review } from "./Review.tsx";
import { TReview } from "../../types/TReview.ts";

export function ProductReviews({ productId }: { productId: string }) {
  const {
    data: reviewResponse,
    isLoading: isReviewLoading,
    isError: isReviewError,
    error: reviewError,
  } = useGetAllReviewQuery(productId);

  const [createReview, { isLoading: isCreatingReview }] =
    useCreateReviewMutation();

  const reviews: TReview[] | undefined = reviewResponse?.data || [];

  const [comment, setComment] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  if (isReviewError) {
    const apiError = reviewError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching reviews"
        }
      />
    );
  }
  if (isReviewLoading) return <Loader />;

  const ratingHandler = (rate: number) => setRating(rate);

  const reviewHandler = async () => {
    const data = {
      newReview: {
        comment,
        rating,
      },
      productId,
    };
    try {
      await createReview(data).unwrap();
      toast.success("Review added ");
      setRating(1);
      setComment("");
    } catch (error) {
      const appError = error as TApiError;
      toast.error(appError.data.message || "An error occurred");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-3 row-start-2 md:col-span-2 md:row-auto flex flex-col gap-4">
        {reviews?.length === 0 ? (
          <EmptyMessage message="There is no review to show" />
        ) : (
          reviews.map((rev) => <Review review={rev} key={rev._id} />)
        )}
      </div>

      <div className="col-span-3 md:col-span-1 px-4">
        <h1 className="text-xl font-bold">Add your review</h1>
        <div className="form-control w-full mb-4">
          <label
            className="label text-gray-700 text-sm font-bold"
            htmlFor="comment"
          >
            Comment
          </label>
          <textarea
            id="comment"
            placeholder="Best ...."
            className="textarea textarea-bordered w-full"
            required
            rows={2}
            disabled={isCreatingReview}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <RatingStar
          numStar={rating}
          size={28}
          handler={ratingHandler}
          interactive
        />
        <button
          disabled={isCreatingReview || !comment}
          className="btn btn-primary mt-10"
          onClick={reviewHandler}
        >
          Review it
        </button>
      </div>
    </div>
  );
}
