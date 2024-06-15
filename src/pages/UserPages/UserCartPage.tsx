import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { TApiError } from "../../types/TApiError";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useRemoveEntireCartMutation,
  useUpdateCartItemMutation,
} from "../../redux/cart/cartApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { CartItems } from "../../components/user/CartItems";
import { TCart } from "../../types/TCart.ts";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";

export function UserCartPage() {
  const navigate = useNavigate();
  const { data: cartResponse, isLoading: isCartLoading } = useGetCartQuery();

  const [updateCartItem, { isLoading: isUpdatingCartItem }] =
    useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: isRemovingCartItem }] =
    useRemoveCartItemMutation();

  const [removeEntireCart, { isLoading: isRemoveEntireCart }] =
    useRemoveEntireCartMutation();
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

  const handleRemoveEntireCart = async () => {
    try {
      await removeEntireCart().unwrap();
      navigate("/products");
      toast.success("The entire cart item deleted");
    } catch (err) {
      const apiError = err as TApiError;
      toast.error(
        `Failed to remove all items in the cart : ${apiError.data.message}`,
      );
    }
  };

  if (isCartLoading) return <Loader />;

  if (!cart) {
    return <EmptyMessage message={"No cart item available "} />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2">
          {isRemoveEntireCart ? (
            <Loader />
          ) : (
            <CartItems
              items={cart.items}
              handleUpdateCartItem={handleUpdateCartItem}
              handleRemoveCartItem={handleRemoveCartItem}
              loading={isRemovingCartItem || isUpdatingCartItem}
            />
          )}
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <button
            className="btn btn-error w-full"
            disabled={isRemoveEntireCart}
            onClick={handleRemoveEntireCart}
          >
            Clear cart
          </button>

          <Link className="btn btn-primary w-full" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
