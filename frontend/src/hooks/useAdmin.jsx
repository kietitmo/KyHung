import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

export const useAdmin = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      setUsers(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = async (email, userData) => {
    try {
      setLoading(true);
      const response = await api.put(`/users/${email}`, userData);
      const users_res = await api.get("/users");
      setUsers(users_res.data.data);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (email) => {
    try {
      setLoading(true);
      await api.delete(`/users/${email}`);
      const users_res = await api.get("/users");
      setUsers(users_res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (email, reason) => {
    try {
      setLoading(true);
      const response = await api.put(`/auth/block-user`, { email, reason });
      const users_res = await api.get("/users");
      setUsers(users_res.data.data);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to block user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (email) => {
    try {
      setLoading(true);
      const response = await api.put(`/auth/unblock-user`, { email });
      const users_res = await api.get("/users");
      setUsers(users_res.data.data);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to unblock user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await api.post("/products", productData);
      setProducts([...products, response.data.data]);
      setError(null);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      setLoading(true);
      const response = await api.put(`/products/${productId}`, productData);
      setProducts(
        products.map((product) =>
          product.id === productId ? response.data : product
        )
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      setLoading(true);
      await api.delete(`/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current && user?.role === "admin" && isAuthenticated) {
      fetchUsers();
      fetchProducts();
      hasFetched.current = true;
    }
  }, [user?.role, isAuthenticated, fetchUsers, fetchProducts]);

  return {
    users,
    products,
    loading,
    error,
    fetchUsers,
    fetchProducts,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    createProduct,
    updateProduct,
    deleteProduct,
  };
};
