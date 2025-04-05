import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunks
export const updateProfile = createAsyncThunk(
	'user/updateProfile',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await api.put('/users/profile', userData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const changePassword = createAsyncThunk(
	'user/changePassword',
	async (passwordData, { rejectWithValue }) => {
		try {
			const response = await api.post('/users/change-password', passwordData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchFavoriteProducts = createAsyncThunk(
	'user/fetchFavoriteProducts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get('/users/favorite-products');
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const addFavoriteProduct = createAsyncThunk(
	'user/addFavoriteProduct',
	async (productId, { rejectWithValue }) => {
		try {
			const response = await api.post(`/users/favorite-products/${productId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const removeFavoriteProduct = createAsyncThunk(
	'user/removeFavoriteProduct',
	async (productId, { rejectWithValue }) => {
		try {
			const response = await api.delete(`/users/favorite-products/${productId}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	profile: null,
	favoriteProducts: [],
	loading: false,
	error: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearProfile: (state) => {
			state.profile = null;
			state.favoriteProducts = [];
		},
	},
	extraReducers: (builder) => {
		builder
			// Update Profile
			.addCase(updateProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to update profile';
			})
			// Change Password
			.addCase(changePassword.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.loading = false;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to change password';
			})
			// Fetch Favorite Products
			.addCase(fetchFavoriteProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchFavoriteProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.favoriteProducts = action.payload;
			})
			.addCase(fetchFavoriteProducts.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || 'Failed to fetch favorite products';
			})
			// Add Favorite Product
			.addCase(addFavoriteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addFavoriteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.favoriteProducts.push(action.payload);
			})
			.addCase(addFavoriteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to add favorite product';
			})
			// Remove Favorite Product
			.addCase(removeFavoriteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(removeFavoriteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.favoriteProducts = state.favoriteProducts.filter(
					(product) => product.id !== action.payload.id
				);
			})
			.addCase(removeFavoriteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error =
					action.payload?.message || 'Failed to remove favorite product';
			});
	},
});

export const { clearError, clearProfile } = userSlice.actions;
export const reducer = userSlice.reducer;
