import { APIResponse, CustomError } from '../custom/index.js';
import mongoose from 'mongoose';
import pkg from 'joi';
const { ValidationError } = pkg;
import { logger } from './logger.middleware.js';
import env from '../config/env.js';

const errorHandler = (err, req, res, next) => {
	// Generate unique error ID for tracking
	const errorId = Math.random().toString(36).substring(7);

	// Log error with request details
	logger.error('Error occurred:', {
		errorId,
		error: err.message,
		stack: env.NODE_ENV === 'development' ? err.stack : undefined,
		path: req.path,
		method: req.method,
		ip: req.ip,
		user: req.user?.id,
		body: sanitizeRequestBody(req.body),
		query: req.query,
		params: req.params,
	});

	// Handle custom application errors
	if (err instanceof CustomError) {
		const data = {
			errorId,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(err.httpStatusCode).json(response);
	}

	// Handle Joi validation errors
	if (err instanceof ValidationError) {
		const data = {
			errorId,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(400).json(response);
	}

	// Handle Mongoose validation errors
	if (err instanceof mongoose.Error.ValidationError) {
		const errors = Object.values(err.errors).map((error) => ({
			field: error.path,
			message: error.message,
			type: error.kind,
			value: error.value,
		}));

		const data = {
			errorId,
			errors,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(400).json(response);
	}

	// Handle Mongoose duplicate key errors
	if (err.code === 11000) {
		const field = Object.keys(err.keyPattern)[0];
		const value = err.keyValue[field];

		return res.status(409).json(
			APIResponse.fail(409, `${field} already exists`, {
				errorId,
				field,
				value,
			})
		);
	}

	// Handle JWT errors
	if (err.name === 'JsonWebTokenError') {
		const data = {
			errorId,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(401).json(response);
	}

	if (err.name === 'TokenExpiredError') {
		const data = {
			errorId,
			expiredAt: err.expiredAt,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(401).json(response);
	}

	// Handle rate limit errors
	if (err.type === 'entity.too.large') {
		const data = {
			errorId,
			limit: env.REQUEST_BODY_LIMIT,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(413).json(response);
	}

	// Handle file upload errors
	if (err.code === 'LIMIT_FILE_SIZE') {
		const data = {
			errorId,
			limit: env.MAX_FILE_SIZE,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(413).json(response);
	}

	if (err.code === 'LIMIT_UNEXPECTED_FILE') {
		const data = {
			errorId,
		};
		const response = APIResponse.fail(err.message, data);
		return res.status(400).json(response);
	}

	// Default error - don't expose internal errors in production
	const isProduction = env.NODE_ENV === 'production';
	const data = {
		errorId,
		...(env.NODE_ENV === 'development' && { stack: err.stack }),
	};
	const response = APIResponse.fail(
		isProduction ? 'Internal Server Error' : err.message,
		data
	);
	return res.status(500).json(response);
};

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

export default errorHandler;
