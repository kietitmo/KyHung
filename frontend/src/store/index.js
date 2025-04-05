import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/authSlice';
import { reducer as productReducer } from './slices/productSlice';
import { reducer as userReducer } from './slices/userSlice';
import reduxLogger from '../utils/reduxLogger';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productReducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(reduxLogger),
	devTools: process.env.NODE_ENV !== 'production',
});
