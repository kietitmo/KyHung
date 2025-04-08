import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  setCredentials,
  setLoading,
  setError,
  logout,
  updateUser,
  selectUser,
  selectIsAuthenticated,
  selectLoading,
  selectError,
  login,
  register,
  checkAuth,
} from "../store/slices/authSlice";
import { useMemo } from "react";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Use refs to track auth check state
  const checkAuthRef = useRef(false);
  const authCheckTimeoutRef = useRef(null);
  const lastAuthCheckRef = useRef(0);

  const handleApiError = useCallback(
    (error) => {
      let message = "An error occurred";

      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        message =
          error.response.data?.message || error.response.data?.error || message;
      } else if (error.request) {
        // The request was made but no response was received
        message = "No response from server";
      } else {
        // Something happened in setting up the request that triggered an Error
        message = error.message || message;
      }

      console.error("API Error:", error);
      dispatch(setError(message));
    },
    [dispatch]
  );

  const loginUser = useCallback(
    async (email, password) => {
      try {
        dispatch(setLoading(true));
        const result = await dispatch(login({ email, password })).unwrap();

        // Check if the result has the expected structure
        if (!result || !result.user) {
          throw new Error("Invalid login response");
        }

        return result.user;
      } catch (err) {
        // Log the error for debugging
        console.error("Login error:", err);

        // If it's already a string error message, use it directly
        if (typeof err === "string") {
          dispatch(setError(err));
        } else {
          // Otherwise use the handleApiError function
          handleApiError(err);
        }
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, handleApiError]
  );

  const logoutUser = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);

  const checkAuthStatus = useCallback(async () => {
    // Prevent multiple simultaneous auth checks
    if (checkAuthRef.current) {
      return;
    }

    // Don't check if not authenticated
    if (!isAuthenticated) {
      return;
    }

    // Check if we have a token in localStorage
    const token = localStorage.getItem("access_token");
    if (!token) {
      dispatch(logout());
      return;
    }

    // Prevent checking too frequently (at least 30 seconds between checks)
    const now = Date.now();
    if (now - lastAuthCheckRef.current < 30000) {
      return;
    }

    try {
      checkAuthRef.current = true;
      lastAuthCheckRef.current = now;

      await dispatch(checkAuth()).unwrap();
    } catch (err) {
      console.error("Auth check failed:", err);

      // If token expired or invalid, clear tokens and redirect to login
      if (err.includes("expired") || err.includes("invalid")) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        dispatch(logout());
        navigate("/login");
      }

      // Set a timeout to prevent immediate retry
      if (authCheckTimeoutRef.current) {
        clearTimeout(authCheckTimeoutRef.current);
      }

      authCheckTimeoutRef.current = setTimeout(() => {
        checkAuthRef.current = false;
      }, 30000); // Wait 30 seconds before allowing another check
    } finally {
      checkAuthRef.current = false;
    }
  }, [dispatch, isAuthenticated, navigate]);

  // Check auth status on mount and when isAuthenticated changes
  useEffect(() => {
    checkAuthStatus();

    return () => {
      if (authCheckTimeoutRef.current) {
        clearTimeout(authCheckTimeoutRef.current);
      }
    };
  }, [checkAuthStatus]);

  const registerUser = async (userData) => {
    try {
      dispatch(setLoading(true));
      const result = await dispatch(register(userData)).unwrap();
      return result.user;
    } catch (err) {
      handleApiError(err);
    }
  };

  const forgotPassword = async (email) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      dispatch(setLoading(true));
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (err) {
      handleApiError(err);
    }
  };

  return useMemo(
    () => ({
      user,
      isAuthenticated,
      loading,
      error,
      login: loginUser,
      loginUser,
      logoutUser,
      registerUser,
      forgotPassword,
      resetPassword,
      checkAuthStatus,
    }),
    [
      user,
      isAuthenticated,
      loading,
      error,
      loginUser,
      logoutUser,
      registerUser,
      forgotPassword,
      resetPassword,
      checkAuthStatus,
    ]
  );
};
