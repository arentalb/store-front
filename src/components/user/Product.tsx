import { Link } from "react-router-dom";
import { TProduct } from "../../types/TProduct";

interface ProductProps {
  pro: TProduct;
}

export function Product({ pro }: ProductProps) {
  return (
    <div
      key={pro._id}
      className="shadow-lg rounded-lg overflow-hidden flex flex-col h-full gap-4 p-4 bg-white"
    >
      <div className="w-full">
        <img
          src={pro.coverImage}
          alt={pro.name}
          className="object-cover h-28  w-full rounded"
        />
      </div>
      <div className="flex  justify-between   py-4">
        <div>
          <p className="text-lg uppercase font-semibold">{pro.name}</p>
          <p className="text-base text-gray-500 ">
            {pro.price}
            {" IQD"}
          </p>
        </div>
        <p className="text-sm text-gray-600 whitespace-nowrap">
          {pro.stock > 0 ? "In Stock" : "Out Of Stock"}
        </p>
      </div>
      <Link
        to={`/product/${pro._id}`}
        className="btn btn-primary w-full self-end mt-auto"
      >
        See Detail
      </Link>
    </div>
  );
}
