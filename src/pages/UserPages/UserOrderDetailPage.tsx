import { useParams } from "react-router-dom";
import { useGetUserOrderDetailQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrderDetailsTable } from "../../components/user/OrderDetailsTable.tsx";
import { OrderItemsTable } from "../../components/user/OrderItemsTable.tsx";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";

export function UserOrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const {
    data: orderResponse,
    error: orderError,
    isLoading: isOrderLoading,
    isError: isOrderError,
  } = useGetUserOrderDetailQuery(id!);

  const order: TOrder | undefined = orderResponse?.data;

  if (isOrderLoading) return <Loader />;

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

  if (!order) {
    return <ErrorMessage message={"No order available "} />;
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
