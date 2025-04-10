import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  Chip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchProductById, deleteProduct } from "../store/slices/productSlice";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentProduct, loading, error } = useSelector(
    (state) => state.products
  );
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "ADMIN";

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await dispatch(deleteProduct(id)).unwrap();
        navigate("/products");
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!currentProduct) {
    return (
      <Container>
        <Alert severity="info" sx={{ mt: 2 }}>
          Product not found
        </Alert>
      </Container>
    );
  }

  // Ensure we have valid data before rendering
  const product = currentProduct || {};
  const price =
    typeof product.price === "number" ? product.price.toFixed(2) : "0.00";

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/products")}
          sx={{
            mb: 3,
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
          Back to Products
        </Button>

        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "#f9f9f9",
            borderRadius: "8px",
            border: "1px solid #e0e0e0",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src={product.imageUrl || "https://via.placeholder.com/400x300"}
                alt={product.name || "Product"}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  border: "1px solid #e0e0e0",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
              {product.videoUrl && (
                <Box sx={{ mt: 2 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: "bold",
                      color: "#333",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Product Video
                  </Typography>
                  <Box
                    component="video"
                    controls
                    src={product.videoUrl}
                    sx={{
                      width: "100%",
                      borderRadius: "4px",
                      border: "1px solid #e0e0e0",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    }}
                  />
                </Box>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
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
                {product.name || "Product"}
              </Typography>
              <Typography
                variant="h5"
                color="primary"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                }}
              >
                ${price}
              </Typography>
              {product.category && (
                <Chip
                  label={product.category.name}
                  sx={{
                    mb: 2,
                    backgroundColor: "#42a5f5",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "4px",
                  }}
                />
              )}
              <Divider
                sx={{ my: 2, borderColor: "#e0e0e0", borderWidth: "1px" }}
              />
              <Typography
                variant="body1"
                paragraph
                sx={{
                  lineHeight: 1.6,
                  color: "#555",
                }}
              >
                {product.description || "No description available."}
              </Typography>
              <Box sx={{ mt: 3 }}>
                {isAdmin && (
                  <Box sx={{ display: "flex", gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/products/${id}/edit`)}
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
                      Edit
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      startIcon={<DeleteIcon />}
                      onClick={handleDelete}
                      sx={{
                        backgroundColor: "#d32f2f",
                        color: "white",
                        fontWeight: "bold",
                        textTransform: "none",
                        borderRadius: "4px",
                        padding: "8px 16px",
                        "&:hover": {
                          backgroundColor: "#c62828",
                        },
                      }}
                    >
                      Delete
                    </Button>
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default ProductDetail;
