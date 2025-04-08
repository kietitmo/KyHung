import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
  CircularProgress,
  Alert,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { useFavorites } from "../../hooks/useFavorites";
import { Link as RouterLink } from "react-router-dom";

const FavoriteProducts = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { favorites, removeFromFavorites, loading, error, fetchFavorites } =
    useFavorites();
  const [removeError, setRemoveError] = useState("");
  const mountedRef = useRef(false);

  // Only fetch on mount if authenticated
  useEffect(() => {
    mountedRef.current = true;

    if (isAuthenticated && user?.email) {
      fetchFavorites();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [isAuthenticated, user?.email, fetchFavorites]);

  const handleRemoveFavorite = useCallback(
    async (productId) => {
      if (!mountedRef.current) return;

      try {
        await removeFromFavorites({ email: user.email, productId });
        setRemoveError("");
      } catch (err) {
        if (mountedRef.current) {
          setRemoveError("Failed to remove product from favorites");
        }
      }
    },
    [user?.email, removeFromFavorites]
  );

  if (!isAuthenticated) {
    return (
      <Container>
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h5" gutterBottom>
            Please log in to view your favorite products
          </Typography>
          <Button
            component={RouterLink}
            to="/login"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </Box>
      </Container>
    );
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          component={RouterLink}
          to="/login"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login Again
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        My Favorite Products
      </Typography>
      {removeError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {removeError}
        </Alert>
      )}
      {favorites.length === 0 ? (
        <Typography>
          You haven't added any products to your favorites yet.
        </Typography>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" component="div">
                      {product.name}
                    </Typography>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveFavorite(product.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                  <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default FavoriteProducts;
