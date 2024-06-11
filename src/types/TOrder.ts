import { TUser } from "./TUser.ts";

export interface TShippingAddress {
  city: string;
  neighborhood: string;
  streetNumber: string;
  houseNumber: string;
}

export interface TOrder {
  _id: string;
  user: TUser;
  shippingAddress: TShippingAddress;
  totalPrice: number;
  paymentMethod: string;
  isPaid: boolean;
  isDelivered: boolean;
  items: {
    _id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
}
