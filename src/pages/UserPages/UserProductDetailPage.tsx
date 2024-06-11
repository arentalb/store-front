// src/pages/ProductDetailPage.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";

import { TApiError } from "../../types/TApiError";
import { TProduct } from "../../types/TProduct";
import { useGetProductByIdQuery } from "../../redux/product/productApiSlice";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "../../redux/cart/cartApiSlice";

export function UserProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: productData,
    error: productError,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useGetProductByIdQuery(id!);
  const product = productData?.data;

  const {
    data: cartData,
    error: cartError,
    isLoading: isCartLoading,
  } = useGetCartQuery();
  const [addToCart, { error: addToCartError }] = useAddToCartMutation();
  const [updateCartItem, { error: updateCartError }] =
    useUpdateCartItemMutation();

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cartData?.data?.items) {
      const existingProduct = cartData.data.items.find(
        (item) => item.product === id,
      );
      if (existingProduct) {
        setQuantity(existingProduct.quantity);
        setIsProductAdded(true);
      } else {
        setIsProductAdded(false);
      }
    }
  }, [cartData, id]);

  const handleAddToCart = async (product: TProduct) => {
    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success(`${product.name} added to cart`);
    } catch (err) {
      const apiError = err as TApiError;
      toast.error(apiError?.data?.message || "Failed to add to cart");
    }
  };

  const handleUpdateCartItem = async (productId: string, quantity: number) => {
    try {
      await updateCartItem({ productId, quantity }).unwrap();
      toast.success("Cart updated");
    } catch (err) {
      const apiError = err as TApiError;
      toast.error(apiError?.data?.message || "Failed to update cart");
    }
  };

  if (isCartLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (isProductError) {
    const apiError = productError as TApiError;
    toast.error(`Error loading product details: ${apiError?.data?.message}`);
    return (
      <div className="text-center text-red-500">
        Error loading product details: {apiError?.data?.message}
      </div>
    );
  }

  if (addToCartError) {
    const apiError = addToCartError as TApiError;
    return (
      <div className="text-center text-red-500">
        Error: {apiError?.data?.message}
      </div>
    );
  }
  if (cartError) {
    const apiError = cartError as TApiError;
    return (
      <div className="text-center text-red-500">
        Error: {apiError?.data?.message}
      </div>
    );
  }

  if (updateCartError) {
    const apiError = updateCartError as TApiError;
    return (
      <div className="text-center text-red-500">
        Error: {apiError?.data?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {isProductLoading ? (
        <div className="flex justify-center items-center h-screen">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        product && (
          <div className="flex flex-col gap-8 md:flex-row">
            <LeftColumn product={product} />
            <RightColumn
              product={product}
              isProductAdded={isProductAdded}
              quantity={quantity}
              handleAddToCart={handleAddToCart}
              handleUpdateCartItem={handleUpdateCartItem}
            />
          </div>
        )
      )}
    </div>
  );
}

function LeftColumn({ product }: { product: TProduct }) {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.coverImage}
        alt={product.name}
        className="w-full rounded-lg shadow-md"
      />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} ${index + 1}`}
            className="w-full rounded-lg shadow-md"
          />
        ))}
      </div>
      <div className="mt-4 md:block hidden">
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}

function RightColumn({
  product,
  isProductAdded,
  quantity,
  handleAddToCart,
  handleUpdateCartItem,
}: {
  product: TProduct;
  isProductAdded: boolean;
  quantity: number;
  handleAddToCart: (product: TProduct) => void;
  handleUpdateCartItem: (productId: string, quantity: number) => void;
}) {
  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>

      <p className="text-lg text-gray-600">
        <strong>Category:</strong> {product.category.name}
      </p>
      <p className="text-lg text-gray-600">
        <strong>Price:</strong> {product.price} IQD
      </p>
      <p className="text-lg text-gray-600">
        <strong>Stock:</strong> {product.stock}
      </p>
      <p className="text-lg text-gray-600">
        <strong>Available in Stock:</strong> {product.availableStock}
      </p>
      <div className="md:hidden block">
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
      <div className="mt-20">
        {isProductAdded ? (
          <div className="flex gap-4 items-center">
            <button
              onClick={() => handleUpdateCartItem(product._id, quantity - 1)}
              className="btn btn-square btn-primary"
            >
              <FiMinus />
            </button>
            <p className="text-lg">{quantity}</p>
            <button
              onClick={() => handleUpdateCartItem(product._id, quantity + 1)}
              className="btn btn-square btn-primary"
            >
              <FiPlus />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary w-32"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
