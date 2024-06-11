import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";

export function AdminOrderListPage() {
  const { data: ordersResponse, error, isLoading } = useGetOrdersQuery();

  const orders = ordersResponse?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
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
              <tr key={order._id}>
                <th>{index + 1}</th>
                <td>{order._id}</td>
                <td>{order.user.email}</td>
                <td>{order.totalPrice} IQD</td>
                <td>{order.isPaid ? "Yes" : "No"}</td>
                <td>{order.isDelivered ? "Yes" : "No"}</td>
                <td>
                  <Link
                    to={`/admin/orders/${order._id}`}
                    className="btn btn-primary"
                  >
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
