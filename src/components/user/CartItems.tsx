import { TCartItem } from "../../types/TCart";
import { CartItem } from "./CartItem";

interface CartItemsProps {
  items: TCartItem[];
  handleUpdateCartItem: (productId: string, quantity: number) => void;
  handleRemoveCartItem: (productId: string) => void;
  loading: boolean;
}

export function CartItems({
  items,
  handleUpdateCartItem,
  handleRemoveCartItem,
  loading,
}: CartItemsProps) {
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
