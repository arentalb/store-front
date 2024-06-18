export interface TReviewRequest {
  newReview: {
    comment: string;
    rating: number;
  };
  productId: string;
}

export interface TReview {
  _id: string;
  product: string;
  user: {
    username: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}
