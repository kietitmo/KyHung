import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import api from "../services/api";

export const useAdmin = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/users");
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/products");
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userId, userData) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${userId}`, userData);
      setUsers(
        users.map((user) => (user._id === userId ? response.data : user))
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    try {
      setLoading(true);
      await api.delete(`/admin/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const blockUser = async (userId) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${userId}/block`);
      setUsers(
        users.map((user) => (user._id === userId ? response.data : user))
      );
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to block user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const unblockUser = async (userId) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${userId}/unblock`);
      setUsers(
        users.map((user) => (user._id === userId ? response.data : user))
      );
      setError(null);
      return response.data;
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
      const response = await api.post("/admin/products", productData);
      setProducts([...products, response.data]);
      setError(null);
      return response.data;
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
      const response = await api.put(
        `/admin/products/${productId}`,
        productData
      );
      setProducts(
        products.map((product) =>
          product._id === productId ? response.data : product
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
      await api.delete(`/admin/products/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.role === "admin") {
      fetchUsers();
      fetchProducts();
    }
  }, [user]);

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
