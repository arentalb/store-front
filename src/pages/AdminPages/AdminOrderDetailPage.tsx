import { TApiError } from "../../types/TApiError";
import { toast } from "react-toastify";
import {
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/order/orderApiSlice";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/common/Loader.tsx";
import { OrderDetailsTable } from "../../components/admin/OrderDetailsTable";
import { ShippingAddressTable } from "../../components/admin/ShippingAddressTable";
import { OrderItemsTable } from "../../components/admin/OrderItemsTable";

export interface IOrderStatusUpdate {
  isDelivered?: boolean;
}

export function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: orderResponse, error, isLoading } = useGetOrderDetailQuery(id!);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const order = orderResponse?.data;

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
          <OrderDetailsTable order={order} />
          <ShippingAddressTable order={order} />
          <OrderItemsTable order={order} />
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
