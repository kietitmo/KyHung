import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Alert,
  TextField,
  InputAdornment,
  IconButton,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";
import api from "../services/api";

const ProductList = () => {
  const { user } = useAuth();
  const { favorites, addToFavorites, removeFromFavorites, isFavorite } =
    useFavorites();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState({ data: { data: [] } });
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await api.get("/categories");
        setCategories(response.data || { data: { data: [] } });
      } catch (err) {
        console.error("Error fetching categories:", err);
        setCategories({ data: { data: [] } });
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch products when search, page, or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categoryId = category !== "all" ? category : "";
        const response = await api.get(
          `/products?page=${page}&limit=12&search=${searchTerm}&categoryId=${categoryId}`
        );

        // Extract products from the API response structure
        const productsData = response.data?.data?.data || [];
        const total = response.data?.data?.total || 0;

        console.log("Products response:", response.data);
        console.log("Products data:", productsData);

        setProducts(productsData);
        setTotalPages(Math.ceil(total / 12));
        setError("");
      } catch (err) {
        setError("Failed to fetch products. Please try again later.");
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, searchTerm, category]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const handleToggleFavorite = async (productId) => {
    if (!user) {
      // Redirect to login or show login modal
      return;
    }

    try {
      if (isFavorite(productId)) {
        await removeFromFavorites(productId);
      } else {
        await addToFavorites(productId);
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Products
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <form onSubmit={handleSearch}>
              <TextField
                fullWidth
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </form>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                label="Category"
                onChange={handleCategoryChange}
                disabled={categoriesLoading}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {Array.isArray(categories.data.data) &&
                  categories.data.data.map((cat) => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
              {categoriesLoading && (
                <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
                  <CircularProgress size={20} />
                </Box>
              )}
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      {!Array.isArray(products) || products.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.imageUrl}
                    alt={product.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <Typography gutterBottom variant="h6" component="h2">
                        {product.name}
                      </Typography>
                      <IconButton
                        color="primary"
                        onClick={() => handleToggleFavorite(product.id)}
                      >
                        {isFavorite(product.id) ? (
                          <FavoriteIcon />
                        ) : (
                          <FavoriteBorderIcon />
                        )}
                      </IconButton>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {product.description
                        ? `${product.description.substring(0, 100)}${
                            product.description.length > 100 ? "..." : ""
                          }`
                        : "No description available"}
                    </Typography>
                    <Typography variant="h6" color="primary">
                      ${product.price.toFixed(2)}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Link
                        to={`/products/${product.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="button" color="primary">
                          View Details
                        </Typography>
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ProductList;
