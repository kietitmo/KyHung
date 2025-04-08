import { useState, useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import api from "../services/api";

export const useFavorites = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFavorites = useCallback(async () => {
    // Don't fetch if not authenticated or no user
    if (!isAuthenticated || !user?.email) {
      setFavorites([]);
      return;
    }

    try {
      setLoading(true);
      // fetchAttemptsRef.current += 1;

      const response = await api.get(`/favoriteProduct/${user.email}`);

      // Reset fetch attempts on success
      // fetchAttemptsRef.current = 0;

      if (response.data && response.data.data) {
        setFavorites(response.data.data);
      } else {
        setFavorites([]);
      }

      setError(null);
      // lastFetchRef.current = now;
    } catch (err) {
      console.error("Error fetching favorites:", err);

      // If unauthorized, clear favorites and don't retry
      if (err.response?.status === 401) {
        setFavorites([]);
        setError("Authentication required to view favorites");
        return;
      }

      setError(err.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  }, [user?.email, isAuthenticated]);

  const addToFavorites = async ({ email, productId }) => {
    if (!isAuthenticated) {
      setError("You must be logged in to add favorites");
      throw new Error("Not authenticated");
    }

    try {
      setLoading(true);
      const response = await api.post("/favoriteProduct", { email, productId });

      if (response.data && response.data.data) {
        const resProduct = await api.get(
          `/products/${response.data.data.productId}`
        );
        if (resProduct.data && resProduct.data.data) {
          setFavorites((prev) => [...prev, resProduct.data.data]);
          setError(null);
          return resProduct.data.data;
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error adding to favorites:", err);
      setError(err.response?.data?.message || "Failed to add to favorites");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async ({ email, productId }) => {
    if (!isAuthenticated) {
      setError("You must be logged in to remove favorites");
      throw new Error("Not authenticated");
    }

    try {
      setLoading(true);
      await api.delete(`/favoriteProduct`, { data: { email, productId } });
      setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
      setError(null);
    } catch (err) {
      console.error("Error removing from favorites:", err);
      setError(
        err.response?.data?.message || "Failed to remove from favorites"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = useCallback(
    (productId) => {
      return (
        Array.isArray(favorites) &&
        favorites.some((fav) => fav.id === productId)
      );
    },
    [favorites]
  );

  // Initial fetch and cleanup
  useEffect(() => {
    // Clear fetch attempts when auth state changes

    if (isAuthenticated && user?.email) {
      fetchFavorites();
    } else {
      setFavorites([]);
    }

  }, [isAuthenticated, user?.email, fetchFavorites]);

  return {
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    fetchFavorites,
    favorites,
    loading,
    error,
  };
};
