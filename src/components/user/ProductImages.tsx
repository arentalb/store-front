import { TProduct } from "../../types/TProduct";

interface ProductImagesProps {
  product: TProduct;
}

export function ProductImages({ product }: ProductImagesProps) {
  return (
    <div className="w-full md:w-1/2">
      <img
        src={product.coverImage}
        alt={product.name}
        className="w-full rounded-lg shadow-md"
      />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${product.name} ${index + 1}`}
            className="w-full rounded-lg shadow-md"
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
