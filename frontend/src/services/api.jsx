import axios from "axios";
import { store } from "../store/index.jsx";
import {
  selectAccessToken,
  selectRefreshToken,
  logout,
  setCredentials,
} from "../store/slices/authSlice";
import logger from "../utils/logger";

const API_URL = import.meta.env.VITE_API_URL;
const isProd = import.meta.env.MODE === "production";

// Hàm đảm bảo URL có HTTPS
const ensureHttps = (url) => {
  if (url?.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};

// Xác định baseURL dựa trên môi trường
const getBaseUrl = () => {
  if (!API_URL) return "/";
  return isProd ? ensureHttps(API_URL) : API_URL;
};

const api = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // nếu dùng cookie JWT
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    logger.logApiRequest(
      config.method?.toUpperCase(),
      config.url,
      config.data,
      config.headers
    );

    return config;
  },
  (error) => {
    logger.error("API Request Error", error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    logger.logApiResponse(
      response.config.method?.toUpperCase(),
      response.config.url,
      response.status,
      response.data
    );

    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest) {
      logger.logApiError(
        originalRequest.method?.toUpperCase(),
        originalRequest.url,
        error
      );
    } else {
      logger.error("API Error (no request config)", error);
    }

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        logger.info("Attempting to refresh token");

        const refreshToken = store.getState().auth.refreshToken;
        if (!refreshToken) {
          throw new Error("No refresh token available");
        }

        const response = await axios.post(
          `${getBaseUrl()}/api/auth/refresh-token`,
          { refreshToken },
          { headers: { "Content-Type": "application/json" } }
        );

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        if (accessToken) {
          store.dispatch(
            setCredentials({
              accessToken,
              refreshToken: newRefreshToken,
              user: store.getState().auth.user,
            })
          );

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          logger.info("Token refreshed successfully");

          return api(originalRequest);
        } else {
          throw new Error("No access token in refresh response");
        }
      } catch (refreshError) {
        logger.error("Token refresh failed", refreshError);
        store.dispatch(logout());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
