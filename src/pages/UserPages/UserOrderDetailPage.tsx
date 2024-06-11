import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserOrderDetailQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";

export function UserOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useGetUserOrderDetailQuery(id!);

  const order: TOrder | undefined = data?.data;

  if (isLoading) return <Loader />;
  if (error) {
    const apiError = error as TApiError;
    toast.error(apiError?.data?.message || "An error occurred");
    return <div>Error loading order details</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      {order && (
        <>
          <h2 className="text-2xl font-semibold mb-2">Order ID: {order._id}</h2>

          <div className="overflow-x-auto mb-6">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Shipping Address</th>
                  <th>Payment Method</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr key={order._id}>
                  <th>1</th>
                  <td>
                    {order.shippingAddress.houseNumber}{" "}
                    {order.shippingAddress.streetNumber}{" "}
                    {order.shippingAddress.neighborhood}{" "}
                    {order.shippingAddress.city}
                  </td>
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
        </>
      )}
    </div>
  );
}
