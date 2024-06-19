import { TApiError } from "../../types/TApiError.ts";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { Loader } from "../../components/common/Loader.tsx";
import {
  TMetrics,
  useGetMetricsQuery,
} from "../../redux/metrics/metricsApiSlice.ts";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";

export function AdminDashboardPage() {
  const {
    data: metricsResponse,
    isLoading: isMetricsLoading,
    error: metricsError,
    isError: isMetricsError,
  } = useGetMetricsQuery();

  const metrics: TMetrics | undefined = metricsResponse?.data;

  if (isMetricsError) {
    const apiError = metricsError as TApiError;
    return (
      <ErrorMessage
        message={
          apiError.data?.message || "An error occurred while fetching metrics"
        }
      />
    );
  }

  if (isMetricsLoading) return <Loader />;

  if (!metrics) {
    return <EmptyMessage message={"There is no metrics to show "} />;
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Sales */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Sales</h2>
            <p className="text-2xl font-bold">
              {metrics.totalSales.toFixed(2)} IQD
            </p>
          </div>
        </div>

        {/* Total Orders */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Orders</h2>
            <p className="text-2xl font-bold">{metrics.totalOrders}</p>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Average Order Value</h2>
            <p className="text-2xl font-bold">
              {metrics.avgOrderValue.toFixed(2)} IQD
            </p>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="card shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-body">
            <h2 className="card-title">Top Selling Products</h2>
            <ul>
              {metrics.topSellingProducts.map((product) => (
                <li
                  key={product.productId}
                  className="flex justify-between py-1"
                >
                  <span>{product.name}</span>
                  <span className="font-bold">{product.totalSold}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* New Users */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">New Users This Month</h2>
            <p className="text-2xl font-bold">{metrics.newUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
