import { TApiError } from "../../types/TApiError";
import { toast } from "react-toastify";
import {
  useGetOrderDetailQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/order/orderApiSlice";
import { useParams } from "react-router-dom";
import { Loader } from "../../components/common/Loader.tsx";

import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { OrderDetailsTable } from "../../components/common/OrderDetailsTable.tsx";
import { ShippingAddressTable } from "../../components/common/ShippingAddressTable.tsx";
import { OrderItemsTable } from "../../components/common/OrderItemsTable.tsx";

export interface IOrderStatusUpdate {
  isDelivered?: boolean;
}

export function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: orderResponse,
    error: orderError,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetOrderDetailQuery(id!);

  const [updateOrderStatus, { isLoading: isOrderStatusChanging }] =
    useUpdateOrderStatusMutation();

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

  if (isOrderError) {
    const apiError = orderError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching order"
        }
      />
    );
  }

  if (isOrderLoading) return <Loader />;

  if (!order) {
    return <ErrorMessage message={"No order available "} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <OrderDetailsTable order={order} />
      <ShippingAddressTable order={order} />
      <OrderItemsTable order={order} />

      <div className="flex space-x-4">
        {!order.isDelivered && (
          <button
            onClick={() => handleStatusUpdate({ isDelivered: true })}
            className="btn btn-success"
            disabled={isOrderStatusChanging}
          >
            {isOrderStatusChanging ? "Marking" : "Mark as Delivered"}
          </button>
        )}
      </div>
    </div>
  );
}
