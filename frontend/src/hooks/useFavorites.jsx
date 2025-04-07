import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import api from "../services/api";

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const response = await api.get(`/users/${user.email}`);
      console.log(response.data.data);
      setFavorites(response.data.data.favoriteProducts);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (productId) => {
    try {
      setLoading(true);
      const response = await api.post("/favoriteProduct", { productId });
      setFavorites([...favorites, response.data]);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add to favorites");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (productId) => {
    try {
      setLoading(true);
      await api.delete(`/favoriteProduct/${productId}`);
      setFavorites(favorites.filter((fav) => fav._id !== productId));
      setError(null);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to remove from favorites"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some((fav) => fav._id === productId);
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  return {
    favorites,
    loading,
    error,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites,
  };
};
