export type TStripeSession = {
  status: string;
  sessionId: string;
};

export interface UpdateOrderToPaidInput {
  sessionId: string;
  orderId: string;
}

export interface UpdateOrderToPaidResponse {
  status: string;
  data: {
    _id: string;
    isPaid: boolean;
    paidAt: string;
  };
}
