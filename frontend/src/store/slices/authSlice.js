import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Storage helpers
const storage = {
  get: (key) => {
    if (key === "user") {
      return JSON.parse(localStorage.getItem(key) || "null");
    }
    return localStorage.getItem(key);
  },
  set: (key, value) => {
    if (key === "user") {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.setItem(key, value);
    }
  },
  remove: (key) => localStorage.removeItem(key),
  clear: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  },
};

// Get initial state from localStorage
const getInitialState = () => ({
  user: storage.get("user"),
  accessToken: storage.get("access_token"),
  refreshToken: storage.get("refresh_token"),
  isAuthenticated: !!storage.get("access_token"),
  loading: false,
  error: null,
});

// Helper to update auth state and storage
const updateAuthState = (state, { user, accessToken, refreshToken }) => {
  state.user = user;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.isAuthenticated = true;
  state.loading = false;
  state.error = null;

  storage.set("user", user);
  storage.set("access_token", accessToken);
  storage.set("refresh_token", refreshToken);
};

// Async thunks
export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      console.log("Login attempt with:", credentials);
      const response = await api.post("/auth/login", credentials);
      console.log("Login response:", response.data);

      // Check if the response has the expected structure
      if (!response.data || !response.data.data) {
        console.error("Invalid response format:", response.data);
        return rejectWithValue("Invalid response format from server");
      }

      const { user, accessToken, refreshToken } = response.data.data;

      // Validate required fields
      if (!user || !accessToken || !refreshToken) {
        console.error("Missing required fields:", {
          user,
          accessToken,
          refreshToken,
        });
        return rejectWithValue("Missing required authentication data");
      }

      return response.data.data;
    } catch (error) {
      console.error("Login error:", error);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Auth check failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      updateAuthState(state, action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.error = null;
      storage.clear();
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      storage.set("user", action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        updateAuthState(state, action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        updateAuthState(state, action.payload);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Check Auth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        if (action.payload) {
          state.user = action.payload;
          state.loading = false;
          state.error = null;
          storage.set("user", action.payload);
        } else {
          state.loading = false;
          state.user = null;
          state.accessToken = null;
          state.refreshToken = null;
          state.isAuthenticated = false;
          storage.clear();
        }
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        storage.clear();
      });
  },
});

export const {
  setCredentials,
  setLoading,
  setError,
  clearError,
  logout,
  updateUser,
} = authSlice.actions;

// Export the reducer
export const reducer = authSlice.reducer;

// Export selectors
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;
