import { errorCode } from '../constants/commonResponseCode.js';
import APIResponse from '../custom/apiResponse.js';
import { logErrorWithContext } from '../middlewares/error.middleware.js';
import CustomError from '../custom/error/customError.js';
import env from '../config/env.js';
/**
 * Validate request data against Joi schema
 * @param {Object} schema - Joi schema
 * @param {string} property - Request property to validate ('body', 'query', 'params')
 * @returns {Function} Express middleware function
 */
export const validateRequest = (schema, property = 'body') => {
	return async (req, res, next) => {
		try {
			const role = req.user?.role || 'user';
			const schemaOfRole = schema[role];
			if (!schemaOfRole) {
				throw new CustomError(errorCode.INVALID_VALIDATION_SCHEMA);
			}

			const validatedData = await schemaOfRole.validateAsync(req[property], {
				abortEarly: false,
				stripUnknown: true,
			});
			req[property] = validatedData;
			next();
		} catch (error) {
			if (error.isJoi) {
				const details = error.details.map((detail) => ({
					field: detail.path.join('.'),
					message: detail.message,
					type: detail.type,
				}));

				logErrorWithContext(error, req, 'Validation Error', { details });

				const response = APIResponse.fail(
					errorCode.VALIDATION_ERROR.message,
					details
				);
				return res.status(400).json(response);
			}
			next(error);
		}
	};
};

/**
 * Middleware to validate MongoDB ObjectId
 * @param {string} paramName - Name of the parameter containing the ObjectId
 */
export const validateObjectId = (paramName) => {
	return (req, res, next) => {
		const id = req.params[paramName];
		if (!id || !env.MONGO_ID_REGEXP.test(id)) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: paramName,
				value: id,
			});
			return res.status(400).json(response);
		}
		next();
	};
};

/**
 * Middleware to validate MongoDB ObjectId
 * @param {string} paramName - Name of the parameter containing the ObjectId
 */
export const validateEmail = (paramName) => {
	return (req, res, next) => {
		const email = req.params[paramName];
		if (!email || !env.EMAIL_REGEXP.test(email)) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: paramName,
				value: email,
			});
			return res.status(400).json(response);
		}
		next();
	};
};

/**
 * Middleware to validate file upload
 * @param {string} fieldName - Name of the file field
 * @param {string[]} allowedTypes - Allowed MIME types
 * @param {number} maxSize - Maximum file size in bytes
 */
export const validateFileUpload = (fieldName, allowedTypes, maxSize) => {
	return (req, res, next) => {
		if (!req.files || !req.files[fieldName]) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: fieldName,
			});
			return res.status(400).json(response);
		}

		const file = req.files[fieldName];

		if (!allowedTypes.includes(file.mimetype)) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: fieldName,
				allowedTypes,
				receivedType: file.mimetype,
			});
			return res.status(400).json(response);
		}

		if (file.size > maxSize) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: fieldName,
				maxSize,
				receivedSize: file.size,
			});
			return res.status(400).json(response);
		}

		next();
	};
};

/**
 * Middleware to validate request body size
 * @param {number} maxSize - Maximum body size in bytes
 */
export const validateBodySize = (maxSize) => {
	return (req, res, next) => {
		const contentLength = parseInt(req.headers['content-length'], 10);

		if (contentLength > maxSize) {
			const response = APIResponse.fail(errorCode.VALIDATION_ERROR.message, {
				field: 'body',
				maxSize,
				receivedSize: contentLength,
			});
			return res.status(413).json(response);
		}

		next();
	};
};

/**
 * Middleware to validate request rate limit
 * @param {number} windowMs - Time window in milliseconds
 * @param {number} max - Maximum number of requests per window
 */
export const validateRateLimit = (windowMs, max) => {
	const requests = new Map();

	return (req, res, next) => {
		const ip = req.ip;
		const now = Date.now();

		if (!requests.has(ip)) {
			requests.set(ip, {
				count: 1,
				resetTime: now + windowMs,
			});
		} else {
			const request = requests.get(ip);

			if (now > request.resetTime) {
				request.count = 1;
				request.resetTime = now + windowMs;
			} else if (request.count >= max) {
				const response = APIResponse.fail(errorCode.TOO_MANY_REQUESTS.message, {
					resetTime: request.resetTime,
				});
				return res.status(429).json(response);
			} else {
				request.count++;
			}
		}

		next();
	};
};
