import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const login = createAsyncThunk(
	'auth/login',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/login', credentials);
			localStorage.setItem('accessToken', response.data.accessToken);
			localStorage.setItem('refreshToken', response.data.refreshToken);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	'auth/register',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/register', userData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	localStorage.removeItem('accessToken');
	localStorage.removeItem('refreshToken');
});

export const verifyEmail = createAsyncThunk(
	'auth/verifyEmail',
	async (token, { rejectWithValue }) => {
		try {
			const response = await api.post('/auth/verify-email', { token });
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	user: null,
	isAuthenticated: false,
	loading: false,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
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
				state.loading = false;
				state.isAuthenticated = true;
				state.user = action.payload.user;
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Login failed';
			})
			// Register
			.addCase(register.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(register.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Registration failed';
			})
			// Logout
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isAuthenticated = false;
			})
			// Verify Email
			.addCase(verifyEmail.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(verifyEmail.fulfilled, (state) => {
				state.loading = false;
				if (state.user) {
					state.user.isVerified = true;
				}
			})
			.addCase(verifyEmail.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Email verification failed';
			});
	},
});

export const { clearError } = authSlice.actions;
export const reducer = authSlice.reducer;
