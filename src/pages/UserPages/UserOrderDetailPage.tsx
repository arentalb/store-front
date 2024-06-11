import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetUserOrderDetailQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrderDetailsTable } from "../../components/user/OrderDetailsTable.tsx";
import { OrderItemsTable } from "../../components/user/OrderItemsTable.tsx";

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
          <OrderDetailsTable order={order} />
          <OrderItemsTable order={order} />
        </>
      )}
    </div>
  );
}
