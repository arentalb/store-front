// src/pages/UserPages/UserOrdersPage.tsx

import { toast } from "react-toastify";
import { useGetUserOrdersQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrdersTable } from "../../components/user/OrdersTable";

export function UserOrdersPage() {
  const { data, error, isLoading } = useGetUserOrdersQuery();
  const orders: TOrder[] | undefined = data?.data;

  if (isLoading) return <Loader />;

  if (error) {
    const apiError = error as TApiError;
    toast.error(apiError.data.message || "An error occurred");
    return <div>Error: {apiError.data.message}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}
