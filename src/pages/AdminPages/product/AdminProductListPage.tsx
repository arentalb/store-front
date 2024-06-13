import { useGetProductsQuery } from "../../../redux/product/productApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { TApiError } from "../../../types/TApiError.ts";
import { Loader } from "../../../components/common/Loader.tsx";
import { ProductItem } from "../../../components/admin/ProductItem.tsx";
import { TProduct } from "../../../types/TProduct.ts";
import { ErrorMessage } from "../../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../../components/common/EmptyMessage.tsx";

export function AdminProductListPage() {
  const navigate = useNavigate();

  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    error: productsError,
    isError: isProductsError,
  } = useGetProductsQuery();

  const products: TProduct[] | undefined = productsResponse?.data || [];

  if (isProductsError) {
    const apiError = productsError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching products"
        }
      />
    );
  }
  if (isProductsLoading) return <Loader />;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-2xl mb-8">All Products ({products?.length})</h1>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/admin/product/new")}
        >
          Create new
        </button>
      </div>
      {products?.length !== 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyMessage message={"There is no product to show "} />
      )}
    </div>
  );
}
