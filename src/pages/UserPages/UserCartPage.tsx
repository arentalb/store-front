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
import { TCart } from "../../types/TCart.ts";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";

export function UserCartPage() {
  const {
    data: cartResponse,
    error: cartError,
    isError: isCartError,
    isLoading: isCartLoading,
  } = useGetCartQuery();

  const [updateCartItem, { isLoading: isUpdatingCartItem }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemovingCartItem }] =
    useRemoveCartItemMutation();

  const cart: TCart | undefined = cartResponse?.data;

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

  if (isCartLoading) return <Loader />;

  if (!cart) {
    return <ErrorMessage message={"No cart available "} />;
  }
  if (cart.items.length === 0) {
    return <ErrorMessage message={"No cart item available "} />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          <CartItems
            items={cart.items}
            handleUpdateCartItem={handleUpdateCartItem}
            handleRemoveCartItem={handleRemoveCartItem}
            loading={isRemovingCartItem || isUpdatingCartItem}
          />
        </div>
        <div className="col-span-1">
          <Link className="btn btn-primary w-full" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
