import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  TextField,
  Box,
  Pagination,
  CircularProgress,
  Alert,
  Chip,
  Divider,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchProducts, clearError } from "../store/slices/productSlice";

const Products = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    loading,
    error,
    totalPages,
    currentPage,
  } = useSelector((state) => state.products);
  const [search, setSearch] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetching products with page:", currentPage, "search:", search);
    dispatch(fetchProducts({ page: currentPage, search }));
  }, [dispatch, currentPage, search]);

  // Debug log to see what's in the Redux store
  useEffect(() => {
    console.log("Products in Redux store:", products);
  }, [products]);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout
    const timeout = setTimeout(() => {
      dispatch(fetchProducts({ page: 1, search: value }));
    }, 500);

    setSearchTimeout(timeout);
  };

  const handlePageChange = (event, value) => {
    dispatch(fetchProducts({ page: value, search }));
  };

  if (loading && !products?.data?.length) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // Ensure products is always an array
  const productsArray = Array.isArray(products?.data) ? products?.data : [];

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          mt: 4,
          mb: 4,
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            textTransform: "uppercase",
            letterSpacing: "1px",
            borderBottom: "2px solid #1976d2",
            paddingBottom: "10px",
            marginBottom: "20px",
          }}
        >
          Our Products
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
          <TextField
            fullWidth
            label="Search products"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            placeholder="Enter product name..."
          />
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {productsArray.length > 0 ? (
            productsArray.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#f5f5f5",
                    border: "1px solid #e0e0e0",
                    borderRadius: "4px",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    transition:
                      "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={
                      product.imageUrl || "https://via.placeholder.com/300"
                    }
                    alt={product.name}
                    sx={{
                      objectFit: "cover",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{
                        fontWeight: "bold",
                        color: "#333",
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {product.name}
                    </Typography>

                    <Divider
                      sx={{ my: 2, borderColor: "#e0e0e0", borderWidth: "1px" }}
                    />

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, minHeight: "60px" }}
                    >
                      {product.description}
                    </Typography>

                    {product.category && (
                      <Chip
                        label={product.category.name}
                        size="small"
                        sx={{
                          mb: 1,
                          backgroundColor: "#42a5f5",
                          color: "white",
                          fontWeight: "bold",
                          borderRadius: "4px",
                        }}
                      />
                    )}

                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{
                        mt: 2,
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                      }}
                    >
                      ${product.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/products/${product.id}`}
                      variant="contained"
                      fullWidth
                      sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "4px",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "#1565c0",
                        },
                      }}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{ textAlign: "center", my: 4 }}>
                <Typography variant="h6" color="text.secondary">
                  No products found. Try a different search term.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>

        {totalPages > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Products;
