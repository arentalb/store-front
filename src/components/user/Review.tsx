import moment from "moment";
import { RatingStar } from "./RatingStar.tsx";
import { TReview } from "../../types/TReview.ts";

export function Review({ review }: { review: TReview }) {
  const formattedDate = moment(review.createdAt).format("MMMM Do YYYY, h:mm a");

  return (
    <div className="flex justify-between px-4 py-2 border">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-500 mb-2">
          {review.user.username}
        </p>
        <h1 className="text-lg font-bold text-gray-900">{review.comment}</h1>
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-500 mb-2">
          {formattedDate}
        </p>
        <p className="text-xl font-bold text-gray-900 text-end">
          <RatingStar numStar={review.rating} interactive={false} />
        </p>
      </div>
    </div>
  );
}
