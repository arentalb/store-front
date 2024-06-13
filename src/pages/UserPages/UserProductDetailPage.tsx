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
import { TCart } from "../../types/TCart.ts";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";

export function UserProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: productResponse,
    error: productError,
    isError: isProductError,
    isLoading: isProductLoading,
  } = useGetProductByIdQuery(id!);

  const {
    data: cartResponse,
    error: cartError,
    isError: isCartError,
    isLoading: isCartLoading,
  } = useGetCartQuery();

  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();
  const [updateCartItem, { isLoading: isUpdateCartLoading }] =
    useUpdateCartItemMutation();

  const product: TProduct | undefined = productResponse?.data;
  const cart: TCart | undefined = cartResponse?.data;

  const [isProductAdded, setIsProductAdded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (cart?.items) {
      const existingProduct = cart?.items.find((item) => item.product === id);
      if (existingProduct) {
        setQuantity(existingProduct.quantity);
        setIsProductAdded(true);
      } else {
        setIsProductAdded(false);
      }
    }
  }, [cart, id]);

  const handleAddToCart = async (product: TProduct) => {
    try {
      await addToCart({ productId: product._id, quantity: 1 }).unwrap();
      toast.success(`${product.name} added to cart`);
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Failed to add to cart");
    }
  };

  const handleUpdateCartItem = async (
    productId: string,
    newQuantity: number,
  ) => {
    const previousQuantity = quantity;
    setQuantity(newQuantity);
    try {
      await updateCartItem({ productId, quantity: newQuantity }).unwrap();
      toast.success("Cart updated");
    } catch (error) {
      setQuantity(previousQuantity);
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Failed to update cart");
    }
  };

  if (isProductError) {
    const apiError = productError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching product"
        }
      />
    );
  }
  if (isCartError) {
    const apiError = cartError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching cart"
        }
      />
    );
  }
  if (isCartLoading || isProductLoading) {
    return <Loader />;
  }
  if (!product) {
    return <ErrorMessage message={"No product available"} />;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-8 md:flex-row">
        <ProductImages product={product} />
        <ProductDetails
          product={product}
          isProductAdded={isProductAdded}
          quantity={quantity}
          handleAddToCart={handleAddToCart}
          handleUpdateCartItem={handleUpdateCartItem}
          loading={isAddToCartLoading || isUpdateCartLoading}
        />
      </div>
    </div>
  );
}
