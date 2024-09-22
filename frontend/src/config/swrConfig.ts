import api from "@/config/axios";

// SWR Fetcher
export const fetcher = (url: string) => api.get(url).then((res) => res.data);

// SWR Global Configuration (Optional)
export const swrConfig = {
  refreshInterval: 15 * 60 * 1000, // 15 minutes
  revalidateOnFocus: true, // Revalidate when window is focused
  revalidateIfStale: false, // Avoid refetching if data is fresh
  revalidateOnReconnect: true, // Revalidate when network reconnects
};
