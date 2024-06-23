import apiSlice from "../apiSlice.ts";
import { TApiResponse } from "../../types/TApiResponse.ts";
import { METRICS_URL } from "../endpoints.ts";

export interface TMetrics {
  totalSales: number;
  totalOrders: number;
  avgOrderValue: number;
  topSellingProducts: { productId: string; name: string; totalSold: number }[];
  newUsers: number;
  salesData: { date: string; totalSales: number }[];
  ordersData: { date: string; totalOrders: number }[];
  orderValueData: { date: string; avgOrderValue: number }[];
  newUsersData: { date: string; newUsers: number }[];
}

const metricsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<TApiResponse<TMetrics>, void>({
      query: () => ({
        url: `${METRICS_URL}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetMetricsQuery } = metricsApiSlice;
