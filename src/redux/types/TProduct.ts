export interface TProduct {
  _id: string;
  name: string;
  description: string;
  category: string;
  coverImage: string;
  images: Array<string>;
  stock: number;
  price: number;
  tags: Array<string>;
  averageRating: number;
  availableStock: number;
  createdAt: Date;
  updatedAt: Date;
}
