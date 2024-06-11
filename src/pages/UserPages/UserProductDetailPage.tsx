import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { TApiError } from "../../types/TApiError";
import { TProduct } from "../../types/TProduct";
import { useGetProductByIdQuery } from "../../redux/product/productApiSlice";
import {
  useAddToCartMutation,
  useGetCartQuery,
  useUpdateCartItemMutation,
} from "../../redux/cart/cartApiSlice";
import { Loader } from "../../components/common/Loader.tsx";
import { ProductImages } from "../../components/user/ProductImages";
import { ProductDetails } from "../../components/user/ProductDetails";

export function UserProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: productData,
    error: productError,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useGetProductByIdQuery(id!);
  const product = productData?.data;

  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
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
    return <Loader />;
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
        <Loader />
      ) : (
        product && (
          <div className="flex flex-col gap-8 md:flex-row">
            <ProductImages product={product} />
            <ProductDetails
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
