import { APIResponse, CustomError } from '../custom/index.js';
import mongoose from 'mongoose';
import pkg from 'joi';
const { ValidationError } = pkg;
import { logger } from './logger.middleware.js';
import env from '../config/env.js';
import { errorCode } from '../constants/commonResponseCode.js';
import multer from 'multer';
import fs from 'fs';

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

const handleCustomError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(err.message, data);
	return res.status(err.httpStatusCode).json(response);
};

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

const handleMongooseDocumentNotFoundError = (err, res, errorId) => {
	const data = { errorId };
	return res.status(404).json(APIResponse.fail('Resource not found', data));
};

const handleSyntaxError = (err, res, errorId) => {
	const data = { errorId };
	return res
		.status(400)
		.json(APIResponse.fail('Malformed JSON in request body', data));
};

const handleCsrfError = (err, res, errorId) => {
	const data = { errorId };
	return res.status(403).json(APIResponse.fail('Invalid CSRF token', data));
};

const handleJwtError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(err.message, data);
	return res.status(401).json(response);
};

const handleJwtTokenExpiredError = (err, res, errorId) => {
	const data = {
		errorId,
		expiredAt: err.expiredAt,
	};
	const response = APIResponse.fail(err.message, data);
	return res.status(401).json(response);
};

const handleEntityTooLargeError = (err, res, errorId) => {
	const data = {
		errorId,
		limit: env.REQUEST_BODY_LIMIT,
	};
	const response = APIResponse.fail(err.message, data);
	return res.status(413).json(response);
};

const handleFileSizeLimitError = (err, res, errorId) => {
	const data = {
		errorId,
		limit: `${(env.MAX_FILE_SIZE / (1024 * 1024)).toFixed(2)} MB`,
	};
	const response = APIResponse.fail(
		'File size exceeds the maximum allowed limit',
		data
	);
	return res.status(413).json(response);
};

const handleUnexpectedFileError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(
		'Unexpected file field in form upload',
		data
	);
	return res.status(400).json(response);
};

const handleInvalidFileTypeError = (err, res, errorId) => {
	const data = {
		errorId,
		allowedTypes: [
			'image/jpeg',
			'image/png',
			'image/gif',
			'image/webp',
			'video/mp4',
			'video/webm',
			'video/quicktime',
		],
	};
	const response = APIResponse.fail('Invalid file type', data);
	return res.status(415).json(response);
};

const handleFileNotFoundError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail('File not found', data);
	return res.status(404).json(response);
};

const handleFilePermissionError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail(
		'Permission denied for file operation',
		data
	);
	return res.status(403).json(response);
};

const handleStorageFullError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail('Storage space full', data);
	return res.status(507).json(response);
};

const handleFileLimitError = (err, res, errorId) => {
	const data = { errorId };
	const response = APIResponse.fail('Too many files uploaded', data);
	return res.status(413).json(response);
};

const handleCloudStorageError = (err, res, errorId) => {
	// TODO: implement cloud service error handler
};

const handleDefaultError = (err, res, errorId) => {
	const isProduction = env.NODE_ENV === 'production';
	const data = { errorId };
	const response = APIResponse.fail(
		isProduction ? 'Internal Server Error' : err.message,
		data
	);
	return res.status(500).json(response);
};

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

	// === FILE ERROR HANDLING ===

	// Handle Multer errors
	if (err instanceof multer.MulterError) {
		switch (err.code) {
			case 'LIMIT_FILE_SIZE':
				return handleFileSizeLimitError(err, res, errorId);
			case 'LIMIT_UNEXPECTED_FILE':
				return handleUnexpectedFileError(err, res, errorId);
			case 'LIMIT_FILE_COUNT':
				return handleFileLimitError(err, res, errorId);
			default:
				// Generic multer error
				const data = { errorId, code: err.code };
				return res.status(400).json(APIResponse.fail('File upload error', data));
		}
	}

	// Handle file system errors
	if (err instanceof fs.Error || err.syscall) {
		switch (err.code) {
			case 'ENOENT':
				return handleFileNotFoundError(err, res, errorId);
			case 'EACCES':
				return handleFilePermissionError(err, res, errorId);
			case 'ENOSPC':
				return handleStorageFullError(err, res, errorId);
			default:
				// Generic file system error
				const data = { errorId, code: err.code };
				return res.status(500).json(APIResponse.fail('File system error', data));
		}
	}

	const isCloudStorageError =
		// AWS S3 errors
		err.code?.startsWith('AWS') ||
		err.code?.startsWith('S3') ||
		// GCS specific errors
		err.code?.startsWith('GCS') ||
		// Common cloud errors
		[
			'AccessDenied',
			'NoSuchKey',
			'NoSuchBucket',
			'InvalidAccessKeyId',
			'SignatureDoesNotMatch',
		].includes(err.code) ||
		// Check for service property AWS SDK errors
		err.service === 'S3' ||
		// Google Cloud Storage errors
		err.name?.includes('GoogleCloud') ||
		err.message?.includes('storage');

	if (isCloudStorageError) {
		return handleCloudStorageError(err, res, errorId);
	}

	// Handle custom file type validation error
	if (err.code === 'INVALID_FILE_TYPE') {
		return handleInvalidFileTypeError(err, res, errorId);
	}

	// Default error - don't expose internal errors in production
	return handleDefaultError(err, res, errorId);
};

export default errorHandler;
