import { Link } from "react-router-dom";
import { TProduct } from "../../types/TProduct";

interface NewProductProps {
  product: TProduct;
}

export function NewProduct({ product }: NewProductProps) {
  return (
    <div
      key={product._id}
      className="shadow-lg rounded-lg overflow-hidden flex flex-col h-full gap-4 p-4 bg-white"
    >
      <div className="w-full">
        <img
          src={product.coverImage}
          alt={product.name}
          className="object-cover h-28 w-full rounded"
        />
      </div>
      <div className="flex justify-between py-4">
        <div>
          <p className="text-lg uppercase font-semibold">{product.name}</p>
          <p className="text-base text-gray-500">{product.price} IQD</p>
        </div>
        <p className="text-sm text-gray-600 whitespace-nowrap">
          {product.stock > 0 ? "In Stock" : "Out Of Stock"}
        </p>
      </div>
      <Link
        to={`/product/${product._id}`}
        className="btn btn-primary w-full self-end mt-auto"
      >
        See Detail
      </Link>
    </div>
  );
}
