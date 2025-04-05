import axios from 'axios';
import logger from '../utils/logger';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// Request interceptor for API calls
api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		// Log the API request
		logger.logApiRequest(
			config.method.toUpperCase(),
			config.url,
			config.data,
			config.headers
		);

		return config;
	},
	(error) => {
		// Log the request error
		logger.error('API Request Error', error);
		return Promise.reject(error);
	}
);

// Response interceptor for API calls
api.interceptors.response.use(
	(response) => {
		// Log the API response
		logger.logApiResponse(
			response.config.method.toUpperCase(),
			response.config.url,
			response.status,
			response.data
		);

		return response;
	},
	async (error) => {
		const originalRequest = error.config;

		// Log the API error
		if (originalRequest) {
			logger.logApiError(
				originalRequest.method.toUpperCase(),
				originalRequest.url,
				error
			);
		} else {
			logger.error('API Error (no request config)', error);
		}

		// If the error status is 401 and there is no originalRequest._retry flag,
		// it means the token has expired and we need to refresh it
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				logger.info('Attempting to refresh token');
				const refreshToken = localStorage.getItem('refreshToken');
				const response = await axios.post(`${API_URL}/auth/refresh-token`, {
					refreshToken,
				});

				const { accessToken } = response.data;
				localStorage.setItem('accessToken', accessToken);
				logger.info('Token refreshed successfully');

				// Retry the original request with the new token
				originalRequest.headers.Authorization = `Bearer ${accessToken}`;
				return api(originalRequest);
			} catch (error) {
				// If refresh token fails, redirect to login
				logger.error('Token refresh failed', error);
				localStorage.removeItem('accessToken');
				localStorage.removeItem('refreshToken');
				window.location.href = '/login';
				return Promise.reject(error);
			}
		}

		return Promise.reject(error);
	}
);

export default api;
