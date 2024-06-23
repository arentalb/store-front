import { TApiError } from "../../types/TApiError.ts";
import { ErrorMessage } from "../../components/common/ErrorMessage.tsx";
import { Loader } from "../../components/common/Loader.tsx";
import {
  TMetrics,
  useGetMetricsQuery,
} from "../../redux/metrics/metricsApiSlice.ts";
import { EmptyMessage } from "../../components/common/EmptyMessage.tsx";
import { Bar, Line } from "react-chartjs-2";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
);

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

  const totalSalesData = {
    labels: metrics.salesData.map((data) => data.date),
    datasets: [
      {
        label: "Total Sales (IQD)",
        data: metrics.salesData.map((data) => data.totalSales),
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  const totalOrdersData = {
    labels: metrics.ordersData.map((data) => data.date),
    datasets: [
      {
        label: "Total Orders",
        data: metrics.ordersData.map((data) => data.totalOrders),
        backgroundColor: "rgba(54,162,235,0.2)",
        borderColor: "rgba(54,162,235,1)",
        borderWidth: 1,
      },
    ],
  };

  const avgOrderValueData = {
    labels: metrics.orderValueData.map((data) => data.date),
    datasets: [
      {
        label: "Average Order Value (IQD)",
        data: metrics.orderValueData.map((data) => data.avgOrderValue),
        backgroundColor: "rgba(255,206,86,0.2)",
        borderColor: "rgba(255,206,86,1)",
        borderWidth: 1,
      },
    ],
  };

  const topSellingProductsData = {
    labels: metrics.topSellingProducts.map((product) => product.name),
    datasets: [
      {
        label: "Total Sold",
        data: metrics.topSellingProducts.map((product) => product.totalSold),
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
    ],
  };

  const newUsersData = {
    labels: metrics.newUsersData.map((data) => data.date),
    datasets: [
      {
        label: "New Users",
        data: metrics.newUsersData.map((data) => data.newUsers),
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Sales</h2>
            <Line data={totalSalesData} />
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Orders</h2>
            <Bar data={totalOrdersData} />
          </div>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Average Order Value</h2>
            <Line data={avgOrderValueData} />
          </div>
        </div>

        <div className="card shadow-lg col-span-1 md:col-span-2 lg:col-span-3">
          <div className="card-body">
            <h2 className="card-title">Top Selling Products</h2>
            <Bar data={topSellingProductsData} />
          </div>
        </div>

        {/* New Users */}
        <div className="card shadow-lg">
          <div className="card-body">
            <h2 className="card-title">New Users This Month</h2>
            <Bar data={newUsersData} />
          </div>
        </div>
      </div>
    </div>
  );
}
