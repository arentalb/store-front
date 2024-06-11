import { TApiError } from "../../types/TApiError";
import { toast } from "react-toastify";
import {
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/order/orderApiSlice";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/common/Loader.tsx";

export interface IOrderStatusUpdate {
  isDelivered?: boolean;
}

export function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: orderResponse, error, isLoading } = useGetOrderDetailQuery(id!);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const order = orderResponse?.data;

  console.log(order);
  const handleStatusUpdate = async (statusUpdate: IOrderStatusUpdate) => {
    try {
      await updateOrderStatus({ id: id!, updateData: statusUpdate }).unwrap();
      toast.success("Order status updated successfully");
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError?.data?.message || "Failed to update order status");
    }
  };

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
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      {order && (
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold mb-2">
              Order ID: {order._id}
            </h2>
            <div className="overflow-x-auto mb-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Payment Method</th>
                    <th>Paid</th>
                    <th>Delivered</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.user.email}</td>
                    <td>{order.paymentMethod}</td>
                    <td>{order.isPaid ? "Yes" : "No"}</td>
                    <td>{order.isDelivered ? "Yes" : "No"}</td>
                    <td>{order.totalPrice} IQD</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="overflow-x-auto mb-6">
              <table className="table">
                <thead>
                  <tr>
                    <th>City</th>
                    <th>Neighborhood</th>
                    <th>Street Number</th>
                    <th>House Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.shippingAddress.city}</td>
                    <td>{order.shippingAddress.neighborhood}</td>
                    <td>{order.shippingAddress.streetNumber}</td>
                    <td>{order.shippingAddress.houseNumber}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="overflow-x-auto mb-6">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price} IQD</td>
                    <td>{item.price * item.quantity} IQD</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex space-x-4">
            {!order.isDelivered && (
              <button
                onClick={() => handleStatusUpdate({ isDelivered: true })}
                className="btn btn-success"
              >
                Mark as Delivered
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
