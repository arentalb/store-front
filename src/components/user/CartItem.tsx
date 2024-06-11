import { FiMinus, FiPlus } from "react-icons/fi";
import { TCartItem } from "../../types/TCart";

interface CartItemProps {
  item: TCartItem;
  handleUpdateCartItem: (productId: string, quantity: number) => void;
  handleRemoveCartItem: (productId: string) => void;
}

export function CartItem({
  item,
  handleUpdateCartItem,
  handleRemoveCartItem,
}: CartItemProps) {
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
