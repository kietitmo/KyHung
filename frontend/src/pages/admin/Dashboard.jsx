import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  TrendingUp as TrendingUpIcon,
} from "@mui/icons-material";
import { useAdmin } from "../../hooks/useAdmin";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { users, products } = useAdmin();

  if (!user || user.role !== "admin") {
    return (
      <Container>
        <Typography>Access denied. Admin privileges required.</Typography>
      </Container>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: users?.data?.length || 0,
      icon: <PeopleIcon sx={{ fontSize: 40 }} />,
      color: "#1976d2",
    },
    {
      title: "Total Products",
      value: products?.data?.length || 0,
      icon: <InventoryIcon sx={{ fontSize: 40 }} />,
      color: "#2e7d32",
    },
    // {
    //   title: "Total Orders",
    //   value: stats?.totalOrders || 0,
    //   icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
    //   color: "#ed6c02",
    // },
    // {
    //   title: "Revenue",
    //   value: `$${stats?.totalRevenue?.toFixed(2) || "0.00"}`,
    //   icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    //   color: "#9c27b0",
    // },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        {statCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 140,
              }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography color="text.secondary" variant="h6">
                  {card.title}
                </Typography>
                <Box sx={{ color: card.color }}>{card.icon}</Box>
              </Box>
              <Typography component="p" variant="h4" sx={{ mt: 2 }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}

        {/* Recent Users */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Recent Users</Typography>
              <Button size="small" onClick={() => navigate("/admin/users")}>
                View All
              </Button>
            </Box>
            <List>
              {users?.data?.map((user) => (
                <React.Fragment key={user.email}>
                  <ListItem>
                    <ListItemText
                      primary={user.fullName}
                      secondary={user.email}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Recent Products */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Recent Products</Typography>
              <Button size="small" onClick={() => navigate("/admin/products")}>
                View All
              </Button>
            </Box>
            <List>
              {products?.data?.map((product) => (
                <React.Fragment key={product.id}>
                  <ListItem>
                    <ListItemText
                      primary={product.name}
                      secondary={`$${product.price}`}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
