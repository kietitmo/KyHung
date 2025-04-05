import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Profile from './pages/Profile';
import ErrorBoundary from './utils/ErrorBoundary';
import logger from './utils/logger';

// Log application startup
logger.info('Application starting up');

function App() {
	return (
		<ErrorBoundary>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Router>
					<Layout>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path="/verify-email" element={<VerifyEmail />} />
							<Route path="/products" element={<Products />} />
							<Route path="/products/:id" element={<ProductDetail />} />
							<Route
								path="/profile"
								element={
									<PrivateRoute>
										<Profile />
									</PrivateRoute>
								}
							/>
						</Routes>
					</Layout>
				</Router>
			</ThemeProvider>
		</ErrorBoundary>
	);
}

export default App;
