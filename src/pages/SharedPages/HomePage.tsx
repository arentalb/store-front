import { Link } from "react-router-dom";
import { useGetNewProductsQuery } from "../../redux/product/productApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { useGetCategoriesQuery } from "../../redux/category/categoryApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { Product } from "../../components/shared/Product.tsx";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";
import { TCategory } from "../../types/TCategory.ts";
import { TProduct } from "../../types/TProduct.ts";

export function HomePage() {
  const {
    data: newProductsResponse,
    isLoading: newProductsIsLoading,
    error: newProductsError,
    isError: newProductsIsError,
  } = useGetNewProductsQuery();
  const {
    data: categoriesResponse,
    isLoading: categoriesIsLoading,
    error: categoriesError,
    isError: categoriesIsError,
  } = useGetCategoriesQuery();

  const categories: TCategory[] | undefined = categoriesResponse?.data || [];
  const products: TProduct[] | undefined = newProductsResponse?.data || [];

  if (newProductsIsError) {
    const apiError = newProductsError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message ||
          "An error occurred while fetching new products"
        }
      />
    );
  }
  if (categoriesIsError) {
    const apiError = categoriesError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message ||
          "An error occurred while fetching categories"
        }
      />
    );
  }
  if (categoriesIsLoading || newProductsIsLoading) return <Loader />;

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

      <>
        <h1 className="text-2xl mb-8">NEW PRODUCTS</h1>
        <div className="overflow-x-auto md:overflow-x-visible mb-12">
          <div className="flex md:grid md:grid-cols-4 gap-4">
            {products.length === 0 ? (
              <EmptyMessage message="No new product available" />
            ) : (
              <>
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="flex-shrink-0 w-64 md:w-auto"
                  >
                    <Product product={product} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>

        <h1 className="text-2xl mb-8">CATEGORIES</h1>
        <div className="overflow-x-auto md:overflow-x-visible mb-12">
          <div className="flex flex-wrap md:grid md:grid-cols-4 gap-4">
            {categories.length === 0 ? (
              <EmptyMessage message="No category available" />
            ) : (
              <>
                {categories.map((category) => (
                  <div key={category._id} className="md:w-auto">
                    <Link
                      to={`/products/?category=${category.name}`}
                      className="btn-primary btn md:w-full"
                    >
                      {category.name}
                    </Link>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
