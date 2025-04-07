import { configureStore } from '@reduxjs/toolkit';
import { reducer as authReducer } from './slices/authSlice.jsx';
import { reducer as productReducer } from './slices/productSlice.jsx';
import { reducer as userReducer } from './slices/userSlice.jsx';
import reduxLogger from '../utils/reduxLogger.jsx';

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
