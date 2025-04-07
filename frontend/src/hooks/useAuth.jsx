import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../services/api";
import {
  setCredentials,
  setLoading,
  setError,
  logout,
  updateUser,
  selectCurrentUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  login,
  register,
  checkAuth,
} from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(checkAuth());
    }
  }, [dispatch, isAuthenticated]);

  const loginUser = async (email, password) => {
    try {
      const result = await dispatch(login({ email, password })).unwrap();
      return result.user;
    } catch (err) {
      throw err;
    }
  };

  const registerUser = async (userData) => {
    try {
      const result = await dispatch(register(userData)).unwrap();
      return result.user;
    } catch (err) {
      throw err;
    }
  };

  const logoutUser = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch(logout());
    }
  };

  const forgotPassword = async (email) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  const resetPassword = async (token, password) => {
    try {
      const response = await api.post("/auth/reset-password", {
        token,
        password,
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login: loginUser,
    register: registerUser,
    logout: logoutUser,
    forgotPassword,
    resetPassword,
    checkAuth: () => dispatch(checkAuth()),
  };
};
