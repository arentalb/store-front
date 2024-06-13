import { useGetUserOrdersQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { TOrder } from "../../types/TOrder.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { OrdersTable } from "../../components/user/OrdersTable";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";

export function UserOrdersPage() {
  const {
    data: ordersResponse,
    error: ordersError,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetUserOrdersQuery();
  const orders: TOrder[] | undefined = ordersResponse?.data || [];

  if (isOrdersError) {
    const apiError = ordersError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching orders"
        }
      />
    );
  }
  if (isOrdersLoading) return <Loader />;

  if (orders?.length === 0) {
    return <EmptyMessage message={"There is no order to show "} />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}
