import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { FullImageUrl } from "../../utils/FullImageUrl.ts";

interface ProductItemProps {
  product: {
    _id: string;
    coverImage: string;
    name: string;
    description: string;
    updatedAt: Date;
  };
}

export function ProductItem({ product }: ProductItemProps) {
  const navigate = useNavigate();

  function showDetailHandler(id: string) {
    navigate(`/admin/product/edit/${id}`);
  }

  return (
    <div
      key={product._id}
      className="shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4 bg-white"
    >
      <div className="md:w-1/3 xl:w-1/4">
        <img
          src={FullImageUrl(product.coverImage)}
          alt={product.name}
          className="object-cover h-28  w-full rounded"
        />
      </div>
      <div className="flex flex-col justify-between md:w-2/3 xl:w-3/4">
        <div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">{product.name}</p>
            <p className="text-sm text-gray-500">
              {moment(product.updatedAt).format("MMM Do YY")}
            </p>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            {product.description.substring(0, 100)} ...
          </p>
        </div>
        <button
          onClick={() => showDetailHandler(product._id)}
          className="btn btn-primary btn-sm w-28 sm:w-36 self-start"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
