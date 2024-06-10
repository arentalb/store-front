import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetNewProductsQuery } from "../redux/feature/productApiSlice.ts";
import { TProduct } from "../redux/types/TProduct.ts";
import { TApiError } from "../redux/types/TApiError.ts";
import { useGetCategoriesQuery } from "../redux/feature/categoryApiSlice.ts";
import { TCategory } from "../redux/types/TCategory.ts";

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
          <div className="">
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
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <h1 className="text-2xl mb-8">NEW PRODUCTS</h1>
          <div className="overflow-x-auto md:overflow-x-visible mb-12">
            <div className="flex md:grid md:grid-cols-4 gap-4">
              {newProductsData?.data?.map((pro: TProduct) => (
                <div key={pro._id} className="flex-shrink-0 w-64 md:w-auto">
                  <NewProduct pro={pro} key={pro._id} />
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-2xl mb-8">CATEGORIES</h1>
          <div className="overflow-x-auto md:overflow-x-visible mb-12">
            <div className="flex flex-wrap md:grid md:grid-cols-4 gap-4">
              {categoriesData?.data.map((cat: TCategory) => (
                <div key={cat._id} className=" md:w-auto">
                  <Category cat={cat} key={cat._id} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Category({ cat }: { cat: TCategory }) {
  return (
    <Link
      to={`/products/?category=${cat.name}`}
      className={"btn-primary btn md:w-full"}
    >
      {cat.name}
    </Link>
  );
}

function NewProduct({ pro }: { pro: TProduct }) {
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
