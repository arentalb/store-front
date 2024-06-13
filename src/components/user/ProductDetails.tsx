import { TProduct } from "../../types/TProduct";
import { FiMinus, FiPlus } from "react-icons/fi";
import { Loader } from "../common/Loader.tsx";

interface ProductDetailsProps {
  product: TProduct;
  isProductAdded: boolean;
  quantity: number;
  handleAddToCart: (product: TProduct) => void;
  handleUpdateCartItem: (productId: string, quantity: number) => void;
  loading: boolean;
}

export function ProductDetails({
  product,
  isProductAdded,
  quantity,
  handleAddToCart,
  handleUpdateCartItem,
  loading,
}: ProductDetailsProps) {
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
              disabled={loading}
            >
              <FiMinus />
            </button>
            <p className="text-lg">{loading ? <Loader /> : quantity}</p>
            <button
              onClick={() => handleUpdateCartItem(product._id, quantity + 1)}
              className="btn btn-square btn-primary"
              disabled={loading}
            >
              <FiPlus />
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary w-32"
            disabled={loading}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
