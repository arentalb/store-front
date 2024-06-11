// src/pages/CartPage.tsx
import { toast } from "react-toastify";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { TCartItem } from "../../types/TCart";
import { TApiError } from "../../types/TApiError";
import {
  useGetCartQuery,
  useRemoveCartItemMutation,
  useUpdateCartItemMutation,
} from "../../redux/cart/cartApiSlice.ts";

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

  if (isGettingCart) return <div>Loading...</div>;
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

function CartItems({
  items,
  handleUpdateCartItem,
  handleRemoveCartItem,
}: {
  items: TCartItem[];
  handleUpdateCartItem: (productId: string, quantity: number) => void;
  handleRemoveCartItem: (productId: string) => void;
}) {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem
          key={item.product}
          item={item}
          handleUpdateCartItem={handleUpdateCartItem}
          handleRemoveCartItem={handleRemoveCartItem}
        />
      ))}
    </div>
  );
}

function CartItem({
  item,
  handleUpdateCartItem,
  handleRemoveCartItem,
}: {
  item: TCartItem;
  handleUpdateCartItem: (productId: string, quantity: number) => void;
  handleRemoveCartItem: (productId: string) => void;
}) {
  return (
    <div className="flex justify-between sm:items-center items-start flex-col sm:flex-row p-4 border rounded-lg shadow-md">
      <div className="flex items-center space-x-4 mb-4 sm:mb-0">
        <img
          src={item.coverImage}
          alt={item.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
        <div>
          <p className="font-semibold">{item.name}</p>
          <p className="text-gray-500">Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => handleUpdateCartItem(item.product, item.quantity - 1)}
          className="btn btn-square btn-primary"
        >
          <FiMinus />
        </button>
        <button
          onClick={() => handleUpdateCartItem(item.product, item.quantity + 1)}
          className="btn btn-square btn-primary"
        >
          <FiPlus />
        </button>

        <button
          onClick={() => handleRemoveCartItem(item.product)}
          className="btn btn-error"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
