import React, { useState } from "react";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useAdmin } from "../../hooks/useAdmin";

const UserManagement = () => {
  const {
    users,
    loading,
    error,
    updateUser,
    deleteUser,
    blockUser,
    unblockUser,
    fetchUsers,
  } = useAdmin();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
  });
  const [actionError, setActionError] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
    setEditDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      await updateUser(selectedUser._id, editFormData);
      setEditDialogOpen(false);
    } catch (err) {
      setActionError("Failed to update user");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(userId);
      } catch (err) {
        setActionError("Failed to delete user");
      }
    }
  };

  const handleBlockUser = async (userId, isBlocked) => {
    try {
      if (isBlocked) {
        await unblockUser(userId);
      } else {
        await blockUser(userId);
      }
    } catch (err) {
      setActionError("Failed to update user status");
    }
  };

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        User Management
      </Typography>

      {actionError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {actionError}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user) => (
                <TableRow key={user._id}>
                  <TableCell>
                    {user.firstName} {user.lastName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.isBlocked ? "Blocked" : "Active"}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditClick(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color={user.isBlocked ? "success" : "warning"}
                      onClick={() => handleBlockUser(user._id, user.isBlocked)}
                    >
                      {user.isBlocked ? <CheckCircleIcon /> : <BlockIcon />}
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            value={editFormData.firstName}
            onChange={(e) =>
              setEditFormData({ ...editFormData, firstName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            value={editFormData.lastName}
            onChange={(e) =>
              setEditFormData({ ...editFormData, lastName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Email"
            fullWidth
            value={editFormData.email}
            onChange={(e) =>
              setEditFormData({ ...editFormData, email: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Role"
            fullWidth
            value={editFormData.role}
            onChange={(e) =>
              setEditFormData({ ...editFormData, role: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UserManagement;
