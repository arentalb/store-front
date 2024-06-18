import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

interface RatingStarProps {
  numStar: number;
  size?: number;
  handler?: (newRating: number) => void;
  interactive?: boolean;
}

export function RatingStar({
  numStar,
  size = 16,
  handler,
  interactive = false,
}: RatingStarProps) {
  const [rating, setRating] = useState(numStar);

  const handleClick = (index: number) => {
    if (!interactive) return;
    const newRating = index + 1;
    setRating(newRating);
    handler?.(newRating);
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length: 5 }, (_, index) =>
        index < rating ? (
          <FaStar
            key={index}
            color="#FFD700"
            size={size}
            onClick={() => handleClick(index)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          />
        ) : (
          <FaRegStar
            key={index}
            fill="gray"
            size={size}
            onClick={() => handleClick(index)}
            style={{ cursor: interactive ? "pointer" : "default" }}
          />
        ),
      )}
    </div>
  );
}
