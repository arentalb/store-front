import { TProduct } from "../../types/TProduct";
import { FullImageUrl } from "../../utils/FullImageUrl.ts";

interface ProductImagesProps {
  product: TProduct;
}

export function ProductImages({ product }: ProductImagesProps) {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={FullImageUrl(product.coverImage)}
        alt={product.name}
        className="w-full rounded-lg shadow-md object-cover h-64 md:h-64"
      />
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={FullImageUrl(image)}
            alt={`${product.name} ${index + 1}`}
            className="w-full rounded-lg shadow-md object-cover h-32 sm:h-32"
          />
        ))}
      </div>
      <div className="mt-4 md:block hidden">
        <p className="text-lg text-gray-600">
          <strong>Description:</strong> {product.description}
        </p>
      </div>
    </div>
  );
}
