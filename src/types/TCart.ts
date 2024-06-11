export interface TCartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  coverImage: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface TCart {
  _id: string;
  user: string;
  items: TCartItem[];
  createdAt: string;
  updatedAt: string;
  totalPrice: number;
  totalQuantity: number;
  id: string;
}
