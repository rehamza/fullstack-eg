import { endpoints } from "@/config/endpoint";
import { fetcher, swrConfig } from "@/config/swrConfig";
import useSWR from "swr";  // used for cache the API data

export const useProfile = () => {
  const {
    data,
    error,
    mutate: refetch,
    isLoading,
  } = useSWR(endpoints.profile, fetcher, swrConfig);

  return {
    profile: data?.data,
    isLoading,
    isError: error,
    refetch,
  };
};
