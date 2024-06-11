import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { TApiError } from "../../types/TApiError";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../redux/cart/cartApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { CartItems } from "../../components/user/CartItems";

export function UserCartPage() {
  const {
    data,
    error: getCartError,
    isLoading: isGettingCart,
  } = useGetCartQuery();

  const [updateCartItem, { error: updateCartError }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { error: removeCartError }] =
    useRemoveCartItemMutation();

  const cart = data?.data;

  const handleUpdateCartItem = async (productId: string, quantity: number) => {
    try {
      await updateCartItem({ productId, quantity }).unwrap();
      toast.success("Cart updated");
    } catch (err) {
      const apiError = err as TApiError;
      toast.error(`Failed to update cart: ${apiError.data.message}`);
    }
  };

  const handleRemoveCartItem = async (productId: string) => {
    try {
      await removeCartItem(productId).unwrap();
      toast.success("Item removed from cart");
    } catch (err) {
      const apiError = err as TApiError;
      toast.error(`Failed to remove item: ${apiError.data.message}`);
    }
  };

  if (isGettingCart) return <Loader />;
  if (getCartError) {
    const apiError = getCartError as TApiError;
    return <div>{apiError.data.message}</div>;
  }
  if (updateCartError) {
    const apiError = updateCartError as TApiError;
    return <div>{apiError.data.message}</div>;
  }
  if (removeCartError) {
    const apiError = removeCartError as TApiError;
    return <div>{apiError.data.message}</div>;
  }
  if (!cart) {
    return <p className="text-center text-gray-500">Your cart is empty.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart?.items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2">
            <CartItems
              items={cart.items}
              handleUpdateCartItem={handleUpdateCartItem}
              handleRemoveCartItem={handleRemoveCartItem}
            />
          </div>
          <div className="col-span-1">
            <Link className="btn btn-primary w-full" to="/checkout">
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
}
