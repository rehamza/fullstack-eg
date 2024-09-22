import { getCookies, removeCookies, setCookies } from "@/utils/cookies";
import axios from "axios";
import { ÏToken } from "@/types/user";
import { refreshTokenApi } from "@/apis/user";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const token = getCookies<ÏToken>("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401) {
      const refreshToken = getCookies<ÏToken>("token")?.refreshToken;

      if (refreshToken) {
        try {
          const response = await refreshTokenApi(refreshToken);
          const { accessToken, refreshToken: newRefreshToken } = response.data;
          setCookies("token", { accessToken, refreshToken: newRefreshToken });
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return api(originalRequest);
        } catch (error) {
          console.error("Refresh token failed:", error);
          removeCookies("token");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;
