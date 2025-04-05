/**
 * Logger utility for the application
 * Provides different log levels and formatting options
 */

// Log levels
const LOG_LEVELS = {
	DEBUG: 0,
	INFO: 1,
	WARN: 2,
	ERROR: 3,
};

// Current log level (can be changed based on environment)
let currentLogLevel = LOG_LEVELS.DEBUG;

// Colors for different log levels
const COLORS = {
	DEBUG: '#7f8c8d', // Gray
	INFO: '#3498db', // Blue
	WARN: '#f39c12', // Orange
	ERROR: '#e74c3c', // Red
};

/**
 * Set the current log level
 * @param {string} level - The log level to set (DEBUG, INFO, WARN, ERROR)
 */
export const setLogLevel = (level) => {
	if (LOG_LEVELS[level] !== undefined) {
		currentLogLevel = LOG_LEVELS[level];
	}
};

/**
 * Format a log message with timestamp and optional data
 * @param {string} level - The log level
 * @param {string} message - The message to log
 * @param {object} data - Optional data to include in the log
 * @returns {string} - Formatted log message
 */
const formatLogMessage = (level, message, data) => {
	const timestamp = new Date().toISOString();
	const formattedMessage = `[${timestamp}] [${level}] ${message}`;

	if (data) {
		return `${formattedMessage} ${typeof data === 'object' ? JSON.stringify(data, null, 2) : data}`;
	}

	return formattedMessage;
};

/**
 * Log a debug message
 * @param {string} message - The message to log
 * @param {object} data - Optional data to include in the log
 */
export const debug = (message, data) => {
	if (currentLogLevel <= LOG_LEVELS.DEBUG) {
		const formattedMessage = formatLogMessage('DEBUG', message, data);
		console.log(`%c${formattedMessage}`, `color: ${COLORS.DEBUG}`);
	}
};

/**
 * Log an info message
 * @param {string} message - The message to log
 * @param {object} data - Optional data to include in the log
 */
export const info = (message, data) => {
	if (currentLogLevel <= LOG_LEVELS.INFO) {
		const formattedMessage = formatLogMessage('INFO', message, data);
		console.log(`%c${formattedMessage}`, `color: ${COLORS.INFO}`);
	}
};

/**
 * Log a warning message
 * @param {string} message - The message to log
 * @param {object} data - Optional data to include in the log
 */
export const warn = (message, data) => {
	if (currentLogLevel <= LOG_LEVELS.WARN) {
		const formattedMessage = formatLogMessage('WARN', message, data);
		console.warn(`%c${formattedMessage}`, `color: ${COLORS.WARN}`);
	}
};

/**
 * Log an error message
 * @param {string} message - The message to log
 * @param {object} data - Optional data to include in the log
 */
export const error = (message, data) => {
	if (currentLogLevel <= LOG_LEVELS.ERROR) {
		const formattedMessage = formatLogMessage('ERROR', message, data);
		console.error(`%c${formattedMessage}`, `color: ${COLORS.ERROR}`);
	}
};

/**
 * Log an API request
 * @param {string} method - The HTTP method
 * @param {string} url - The URL being requested
 * @param {object} data - The request data
 * @param {object} headers - The request headers
 */
export const logApiRequest = (method, url, data, headers) => {
	if (currentLogLevel <= LOG_LEVELS.DEBUG) {
		const sanitizedHeaders = { ...headers };
		if (sanitizedHeaders.Authorization) {
			sanitizedHeaders.Authorization = 'Bearer [REDACTED]';
		}

		debug(`API Request: ${method} ${url}`, {
			data,
			headers: sanitizedHeaders,
		});
	}
};

/**
 * Log an API response
 * @param {string} method - The HTTP method
 * @param {string} url - The URL that was requested
 * @param {number} status - The response status code
 * @param {object} data - The response data
 */
export const logApiResponse = (method, url, status, data) => {
	if (currentLogLevel <= LOG_LEVELS.DEBUG) {
		const level = status >= 400 ? 'ERROR' : 'INFO';
		const logFn = level === 'ERROR' ? error : info;

		logFn(`API Response: ${method} ${url} (${status})`, data);
	}
};

/**
 * Log an API error
 * @param {string} method - The HTTP method
 * @param {string} url - The URL that was requested
 * @param {object} error - The error object
 */
export const logApiError = (method, url, error) => {
	if (currentLogLevel <= LOG_LEVELS.ERROR) {
		error(`API Error: ${method} ${url}`, {
			message: error.message,
			status: error.response?.status,
			data: error.response?.data,
		});
	}
};

// Set log level based on environment
if (import.meta.env.PROD) {
	setLogLevel('INFO'); // Only show INFO and above in production
}

export default {
	debug,
	info,
	warn,
	error,
	logApiRequest,
	logApiResponse,
	logApiError,
	setLogLevel,
};
