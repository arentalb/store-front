import { useGetProductsQuery } from "../../../redux/feature/productApiSlice.ts";
import { useNavigate } from "react-router-dom";
import { TApiError } from "../../../redux/types/TApiError.ts";
import { toast } from "react-toastify";
import moment from "moment/moment";

export function AdminProductList() {
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

  function showDetailHandler(id: string) {
    navigate(`/admin/product/edit/${id}`);
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
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products?.map((product) => (
            <div
              key={product._id}
              className="shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-4 p-4 bg-white"
            >
              <div className="md:w-1/3 xl:w-1/4">
                <img
                  src={`/${product.coverImage}`}
                  alt={product.name}
                  className="object-cover h-28 md:h-full w-full rounded"
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
          ))}
        </div>
      )}
    </div>
  );
}
