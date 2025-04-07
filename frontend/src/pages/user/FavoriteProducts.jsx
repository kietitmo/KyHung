import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAuth } from "../../hooks/useAuth";
import { useFavorites } from "../../hooks/useFavorites";

const FavoriteProducts = () => {
  const { user } = useAuth();
  const { favorites, loading, error, removeFavorite } = useFavorites();
  const [removeError, setRemoveError] = useState("");

  const handleRemoveFavorite = async (productId) => {
    try {
      await removeFavorite(productId);
    } catch (err) {
      setRemoveError("Failed to remove product from favorites");
    }
  };

  if (!user) {
    return (
      <Container>
        <Typography>Please log in to view your favorite products.</Typography>
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
        <Alert severity="error">{error}</Alert>
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
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
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
                      onClick={() => handleRemoveFavorite(product._id)}
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
