import { APIResponse, CustomError } from '../custom/index.js';
import mongoose from 'mongoose';
import pkg from 'joi';
const { ValidationError } = pkg;
import { logger } from './logger.middleware.js';
import env from '../config/env.js';
import { errorCode } from '../constants/commonResponseCode.js';

export const logErrorWithContext = (
	error,
	req,
	context,
	additionalData = {}
) => {
	const errorLog = {
		timestamp: new Date().toISOString(),
		context,
		error: {
			message: error.message,
			stack: error.stack,
			code: error.code,
			details: error.details,
		},
		request: {
			path: req.path,
			method: req.method,
			ip: req.ip,
			user: req.user?.id,
			body: req.body,
			query: req.query,
			params: req.params,
		},
		...additionalData,
	};

	logger.error('Error occurred:', errorLog);
};

/**
 * Sanitize request body to remove sensitive information
 * @param {Object} body - Request body
 * @returns {Object} Sanitized request body
 */
const sanitizeRequestBody = (body) => {
	if (!body) return body;

	const sanitized = { ...body };
	const sensitiveFields = ['password', 'token', 'apiKey', 'secret'];

	sensitiveFields.forEach((field) => {
		if (field in sanitized) {
			sanitized[field] = '[REDACTED]';
		}
	});

	return sanitized;
};

/**
 * Handle custom application errors
 * @param {CustomError} err - Custom error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleCustomError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(err.message, data);
	return res.status(err.httpStatusCode).json(response);
};

/**
 * Handle Joi validation errors
 * @param {ValidationError} err - Joi validation error
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleJoiValidationError = (err, res, errorId) => {
	const details = err.details.map((detail) => ({
		field: detail.path.join('.'),
		message: detail.message,
		type: detail.type,
	}));

	const data = { errorId, details };
	const response = APIResponse.fail('Validation Error', data);
	return res.status(400).json(response);
};

/**
 * Handle Mongoose validation errors
 * @param {mongoose.Error.ValidationError} err - Mongoose validation error
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleMongooseValidationError = (err, res, errorId) => {
	const errors = Object.values(err.errors).map((error) => ({
		field: error.path,
		message: error.message,
		type: error.kind,
		value: error.value,
	}));

	const data = { errorId, errors };
	const response = APIResponse.fail('Validation Error', data);
	return res.status(400).json(response);
};

/**
 * Handle Mongoose duplicate key errors
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleMongooseDuplicateKeyError = (err, res, errorId) => {
	const field = Object.keys(err.keyPattern)[0];
	const value = err.keyValue[field];

	return res.status(409).json(
		APIResponse.fail(`${field} already exists`, {
			errorId,
			field,
			value,
		})
	);
};

/**
 * Handle Mongoose CastError (e.g., invalid ObjectId)
 * @param {mongoose.Error.CastError} err - Mongoose cast error
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleMongooseCastError = (err, res, errorId) => {
	const data = {
		errorId,
		field: err.path,
		value: err.value,
	};
	const response = APIResponse.fail(
		errorCode.INVALID_VALUE_FOR_FIELD.message,
		data
	);
	return res.status(400).json(response);
};

/**
 * Handle Mongoose DocumentNotFoundError
 * @param {mongoose.Error.DocumentNotFoundError} err - Mongoose document not found error
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleMongooseDocumentNotFoundError = (err, res, errorId) => {
	const data = { errorId };
	return res.status(404).json(APIResponse.fail('Resource not found', data));
};

/**
 * Handle SyntaxError (malformed JSON)
 * @param {SyntaxError} err - Syntax error
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleSyntaxError = (err, res, errorId) => {
	const data = { errorId };
	return res
		.status(400)
		.json(APIResponse.fail('Malformed JSON in request body', data));
};

/**
 * Handle CSRF token error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleCsrfError = (err, res, errorId) => {
	const data = { errorId };
	return res.status(403).json(APIResponse.fail('Invalid CSRF token', data));
};

/**
 * Handle JWT errors
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleJwtError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(err.message, data);
	return res.status(401).json(response);
};

/**
 * Handle JWT token expired error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleJwtTokenExpiredError = (err, res, errorId) => {
	const data = {
		errorId,
		expiredAt: err.expiredAt,
	};
	const response = APIResponse.fail(err.message, data);
	return res.status(401).json(response);
};

/**
 * Handle entity too large error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleEntityTooLargeError = (err, res, errorId) => {
	const data = {
		errorId,
		limit: env.REQUEST_BODY_LIMIT,
	};
	const response = APIResponse.fail(err.message, data);
	return res.status(413).json(response);
};

/**
 * Handle file size limit error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleFileSizeLimitError = (err, res, errorId) => {
	const data = {
		errorId,
		limit: env.MAX_FILE_SIZE,
	};
	const response = APIResponse.fail(err.message, data);
	return res.status(413).json(response);
};

/**
 * Handle unexpected file error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleUnexpectedFileError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(err.message, data);
	return res.status(400).json(response);
};

/**
 * Handle default error
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 * @param {string} errorId - Unique error ID
 * @returns {Object} Express response
 */
const handleDefaultError = (err, res, errorId) => {
	const isProduction = env.NODE_ENV === 'production';
	const data = { errorId };
	const response = APIResponse.fail(
		isProduction ? 'Internal Server Error' : err.message,
		data
	);
	return res.status(500).json(response);
};

/**
 * Main error handler middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 * @returns {Object} Express response
 */
const errorHandler = (err, req, res, next) => {
	// Generate unique error ID for tracking
	const errorId = Math.random().toString(36).substring(7);

	// Log error with detailed context
	logErrorWithContext(err, req, 'Error Handler', {
		errorId,
		body: sanitizeRequestBody(req.body),
	});

	// Handle custom application errors
	if (err instanceof CustomError) {
		return handleCustomError(err, res, errorId);
	}

	// Handle Joi validation errors
	if (err instanceof ValidationError) {
		return handleJoiValidationError(err, res, errorId);
	}

	// Handle Mongoose validation errors
	if (err instanceof mongoose.Error.ValidationError) {
		return handleMongooseValidationError(err, res, errorId);
	}

	// Handle Mongoose duplicate key errors
	if (err.code === 11000) {
		return handleMongooseDuplicateKeyError(err, res, errorId);
	}

	// Handle Mongoose CastError (e.g., invalid ObjectId)
	if (err instanceof mongoose.Error.CastError) {
		return handleMongooseCastError(err, res, errorId);
	}

	// Handle Mongoose DocumentNotFoundError
	if (err instanceof mongoose.Error.DocumentNotFoundError) {
		return handleMongooseDocumentNotFoundError(err, res, errorId);
	}

	// Handle SyntaxError (malformed JSON)
	if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
		return handleSyntaxError(err, res, errorId);
	}

	// Handle CSRF token error
	if (err.code === 'EBADCSRFTOKEN') {
		return handleCsrfError(err, res, errorId);
	}

	// Handle JWT errors
	if (err.name === 'JsonWebTokenError') {
		return handleJwtError(err, res, errorId);
	}

	// Handle JWT token expired error
	if (err.name === 'TokenExpiredError') {
		return handleJwtTokenExpiredError(err, res, errorId);
	}

	// Handle entity too large error
	if (err.type === 'entity.too.large') {
		return handleEntityTooLargeError(err, res, errorId);
	}

	// Handle file size limit error
	if (err.code === 'LIMIT_FILE_SIZE') {
		return handleFileSizeLimitError(err, res, errorId);
	}

	// Handle unexpected file error
	if (err.code === 'LIMIT_UNEXPECTED_FILE') {
		return handleUnexpectedFileError(err, res, errorId);
	}

	// Default error - don't expose internal errors in production
	return handleDefaultError(err, res, errorId);
};

export default errorHandler;
