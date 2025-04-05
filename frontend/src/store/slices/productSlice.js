import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchProducts = createAsyncThunk(
	'products/fetchProducts',
	async ({ page = 1, limit = 10, search = '' } = {}, { rejectWithValue }) => {
		try {
			const response = await api.get('/products', {
				params: { page, limit, search },
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const fetchProductById = createAsyncThunk(
	'products/fetchProductById',
	async (id, { rejectWithValue }) => {
		try {
			const response = await api.get(`/products/${id}`);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const createProduct = createAsyncThunk(
	'products/createProduct',
	async (productData, { rejectWithValue }) => {
		try {
			const response = await api.post('/products', productData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const updateProduct = createAsyncThunk(
	'products/updateProduct',
	async ({ id, productData }, { rejectWithValue }) => {
		try {
			const response = await api.put(`/products/${id}`, productData);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id, { rejectWithValue }) => {
		try {
			await api.delete(`/products/${id}`);
			return id;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const initialState = {
	products: [],
	currentProduct: null,
	totalPages: 0,
	currentPage: 1,
	loading: false,
	error: null,
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		clearError: (state) => {
			state.error = null;
		},
		clearCurrentProduct: (state) => {
			state.currentProduct = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// Fetch Products
			.addCase(fetchProducts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.loading = false;
				state.products = action.payload.products;
				state.totalPages = action.payload.totalPages;
				state.currentPage = action.payload.currentPage;
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to fetch products';
			})
			// Fetch Product by ID
			.addCase(fetchProductById.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchProductById.fulfilled, (state, action) => {
				state.loading = false;
				state.currentProduct = action.payload;
			})
			.addCase(fetchProductById.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to fetch product';
			})
			// Create Product
			.addCase(createProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products.unshift(action.payload);
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to create product';
			})
			// Update Product
			.addCase(updateProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.products.findIndex(
					(product) => product.id === action.payload.id
				);
				if (index !== -1) {
					state.products[index] = action.payload;
				}
				if (state.currentProduct?.id === action.payload.id) {
					state.currentProduct = action.payload;
				}
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to update product';
			})
			// Delete Product
			.addCase(deleteProduct.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.loading = false;
				state.products = state.products.filter(
					(product) => product.id !== action.payload
				);
				if (state.currentProduct?.id === action.payload) {
					state.currentProduct = null;
				}
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload?.message || 'Failed to delete product';
			});
	},
});

export const { clearError, clearCurrentProduct } = productSlice.actions;
export const reducer = productSlice.reducer;
