import rateLimit from 'express-rate-limit';
import { APIResponse } from '../../domain/custom/index.js';
import { errorCode } from '../../utils/code/rateLimiterResponseCode.js';
import RateLimiterError from '../../domain/custom/rateLimiterError.js';
import env from '../../config/env.js';

/**
 * Create a rate limiter middleware
 * @param {Object} options - Rate limiter options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum number of requests per window
 * @param {string} options.errorType - Type of rate limiter error
 * @returns {Function} - Rate limiter middleware
 */
const createRateLimiter = (options = {}) => {
  const {
    windowMs = env.RATE_LIMIT_WINDOW_MS,
    max = env.RATE_LIMIT_MAX_REQUESTS,
    errorType = 'RATE_LIMIT_EXCEEDED'
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
      res.status(rateLimiterError.statusCode).json(APIResponse.fail(rateLimiterError.statusCode, rateLimiterError.message));
    }
  });
};

// Create specific rate limiters
const authLimiter = createRateLimiter({
  windowMs: env.AUTH_RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX_REQUESTS,
  errorType: 'AUTH_RATE_LIMIT_EXCEEDED'
});

const apiLimiter = createRateLimiter({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS
});

export { createRateLimiter, authLimiter, apiLimiter }; 