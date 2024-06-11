// src/pages/AdminPages/AdminProductListPage.tsx

import { useGetProductsQuery } from "../../../redux/product/productApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { TApiError } from "../../../types/TApiError.ts";
import { toast } from "react-toastify";
import { Loader } from "../../../components/common/Loader.tsx";
import { ProductItem } from "../../../components/admin/ProductItem.tsx";

export function AdminProductListPage() {
  const {
    data: productsResponse,
    isLoading: isProductsLoading,
    error: productsError,
    isError: isProductsError,
  } = useGetProductsQuery();

  const navigate = useNavigate();
  const products = productsResponse?.data;

  if (isProductsError && productsError) {
    const apiError = productsError as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
  }

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
      {isProductsLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products?.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
