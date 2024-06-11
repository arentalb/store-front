import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetNewProductsQuery } from "../../redux/product/productApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { useGetCategoriesQuery } from "../../redux/category/categoryApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { Category } from "../../components/home/Category";
import { NewProduct } from "../../components/home/NewProduct";

export function HomePage() {
  const {
    data: newProductsData,
    isLoading: newProductsIsLoading,
    error: newProductsError,
    isError: newProductsIsError,
  } = useGetNewProductsQuery();
  const {
    data: categoriesData,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    isError: categoriesIsError,
  } = useGetCategoriesQuery();

  if (newProductsIsError) {
    const apiError = newProductsError as TApiError;
    toast.error(apiError.data.message || "An error occurred");
  }
  if (categoriesIsError) {
    const apiError = categoriesError as TApiError;
    toast.error(apiError.data.message || "An error occurred");
  }

  return (
    <div>
      <div
        className="hero mb-8 min-h-60 md:min-h-80"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1598550487031-0898b4852123?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div>
            <h1 className="mb-5 text-2xl md:text-5xl font-bold">
              Welcome to Store!
            </h1>
            <p className="mb-5 text-sm md:text-base">
              Discover the latest trends and exclusive deals. Shop Now!
            </p>
            <Link to={"/products"} className="btn bg-gray-200">
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      {categoriesIsLoading || newProductsIsLoading ? (
        <Loader />
      ) : (
        <>
          <h1 className="text-2xl mb-8">NEW PRODUCTS</h1>
          <div className="overflow-x-auto md:overflow-x-visible mb-12">
            <div className="flex md:grid md:grid-cols-4 gap-4">
              {newProductsData?.data?.map((product) => (
                <div key={product._id} className="flex-shrink-0 w-64 md:w-auto">
                  <NewProduct product={product} />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-2xl mb-8">CATEGORIES</h1>
          <div className="overflow-x-auto md:overflow-x-visible mb-12">
            <div className="flex flex-wrap md:grid md:grid-cols-4 gap-4">
              {categoriesData?.data.map((category) => (
                <div key={category._id} className="md:w-auto">
                  <Category category={category} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
