import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

// Public Pages
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// User Pages
import Profile from "./pages/Profile";
import FavoriteProducts from "./pages/user/FavoriteProducts";

// Admin Pages
import Dashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProductManagement from "./pages/admin/ProductManagement";

import { useSelector } from "react-redux";
import { Box, CircularProgress } from "@mui/material";

// Private Route Component
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If children is provided, render it, otherwise render Outlet
  return children || <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductList />} />
        <Route path="products/:id" element={<ProductDetail />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* User Routes */}
      <Route path="/profile" element={<MainLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Route>

      <Route path="/favorites" element={<MainLayout />}>
        <Route
          index
          element={
            <PrivateRoute>
              <FavoriteProducts />
            </PrivateRoute>
          }
        />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={
            <PrivateRoute adminOnly>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="users"
          element={
            <PrivateRoute adminOnly>
              <UserManagement />
            </PrivateRoute>
          }
        />
        <Route
          path="products"
          element={
            <PrivateRoute adminOnly>
              <ProductManagement />
            </PrivateRoute>
          }
        />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
