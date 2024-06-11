import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrderRow } from "../../components/admin/OrderRow";

export function AdminOrderListPage() {
  const { data: ordersResponse, error, isLoading } = useGetOrdersQuery();

  const orders = ordersResponse?.data;

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    const apiError = error as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
    return <div>Error loading orders</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Orders</h1>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: TOrder, index: number) => (
              <OrderRow key={order._id} order={order} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
