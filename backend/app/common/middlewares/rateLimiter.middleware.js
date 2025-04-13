import rateLimit from 'express-rate-limit';
import { APIResponse } from '../custom/index.js';
import { errorCode } from '../constants/commonResponseCode.js';
import RateLimiterError from '../custom/error/rateLimiterError.js';
import env from '../config/env.js';

const createRateLimiter = (options = {}) => {
	const {
		windowMs = env.RATE_LIMIT_WINDOW_MS,
		max = env.RATE_LIMIT_MAX_REQUESTS,
		errorType = 'RATE_LIMIT_EXCEEDED',
	} = options;

	const error = errorCode[errorType] || errorCode.RATE_LIMIT_EXCEEDED;

	return rateLimit({
		windowMs,
		max,
		message: APIResponse.fail(error.code, error.message),
		standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
		legacyHeaders: false, // Disable the `X-RateLimit-*` headers
		handler: (req, res) => {
			const rateLimiterError = new RateLimiterError(errorType);
			res
				.status(rateLimiterError.statusCode)
				.json(
					APIResponse.fail(rateLimiterError.statusCode, rateLimiterError.message)
				);
		},
	});
};

// Create specific rate limiters
const authLimiter = createRateLimiter({
	windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
	max: env.AUTH_RATE_LIMIT_MAX_REQUESTS,
	errorType: 'AUTH_RATE_LIMIT_EXCEEDED',
});

const apiLimiter = createRateLimiter({
	windowMs: env.RATE_LIMIT_WINDOW_MS,
	max: env.RATE_LIMIT_MAX_REQUESTS,
});

export { createRateLimiter, authLimiter, apiLimiter };
