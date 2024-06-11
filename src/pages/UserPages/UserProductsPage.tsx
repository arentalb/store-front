// src/pages/UserPages/UserProductsPage.tsx

import { TProduct } from "../../types/TProduct.ts";
import { Link, useLocation } from "react-router-dom";
import { TApiError } from "../../types/TApiError.ts";
import { useGetProductsQuery } from "../../redux/product/productApiSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { Product } from "../../components/user/Product";

export function UserProductsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category");

  const { data, isLoading, error, isError } = useGetProductsQuery();
  const products: TProduct[] | undefined = data?.data;
  const errorMessage = (error as TApiError)?.data?.message;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {isError ? (
            <div className="flex flex-col items-center">
              <p className="text-center text-xl mb-8">{errorMessage}</p>
              <Link to="/home" className="btn btn-primary">
                Return home
              </Link>
            </div>
          ) : (
            ""
          )}
          {products && (
            <>
              <h1 className="uppercase text-3xl font-bold mb-6">
                {`ALL ${category ? category : ""} PRODUCTS`}
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                {products.map((pro) => (
                  <div key={pro._id} className="flex-shrink-0 w-full md:w-auto">
                    <Product pro={pro} />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
