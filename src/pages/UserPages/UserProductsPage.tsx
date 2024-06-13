import { TProduct } from "../../types/TProduct.ts";
import { TApiError } from "../../types/TApiError.ts";
import { useGetProductsQuery } from "../../redux/product/productApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { Product } from "../../components/user/Product";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";

export function UserProductsPage() {
  const {
    data: ProductsResponse,
    isLoading: isProductsLoading,
    error: productsError,
    isError: isProductsError,
  } = useGetProductsQuery();
  const products: TProduct[] | undefined = ProductsResponse?.data || [];

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
  if (products?.length === 0) {
    return <EmptyMessage message={"There is no product to show "} />;
  }
  if (isProductsLoading) return <Loader />;
  return (
    <>
      <h1 className="uppercase text-3xl font-bold mb-6">ALL PRODUCTS</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {products.map((pro) => (
          <div key={pro._id} className="flex-shrink-0 w-full md:w-auto">
            <Product pro={pro} />
          </div>
        ))}
      </div>
    </>
  );
}
