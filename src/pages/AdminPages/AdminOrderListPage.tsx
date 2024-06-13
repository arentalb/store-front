import { useGetOrdersQuery } from "../../redux/order/orderApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";
import { OrderList } from "../../components/admin/OrderList.tsx";

export function AdminOrderListPage() {
  const {
    data: ordersResponse,
    error: ordersError,
    isLoading: isOrdersLoading,
    isError: isOrdersError,
  } = useGetOrdersQuery();

  const orders = ordersResponse?.data || [];

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
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">All Orders</h1>
        <OrderList orders={orders} />
      </div>
    </>
  );
}
