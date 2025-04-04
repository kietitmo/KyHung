import rateLimit from 'express-rate-limit';
import { APIResponse } from '../../domain/custom/index.js';

/**
 * Create a rate limiter middleware
 * @param {Object} options - Rate limiter options
 * @param {number} options.windowMs - Time window in milliseconds
 * @param {number} options.max - Maximum number of requests per window
 * @param {string} options.message - Error message
 * @param {number} options.statusCode - HTTP status code
 * @returns {Function} - Rate limiter middleware
 */
const createRateLimiter = (options = {}) => {
  const {
    windowMs = 15 * 60 * 1000, // 15 minutes
    max = 100, // Limit each IP to 100 requests per windowMs
    message = 'Too many requests from this IP, please try again later',
    statusCode = 429
  } = options;

  return rateLimit({
    windowMs,
    max,
    message: APIResponse.fail(statusCode, message),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
      res.status(statusCode).json(APIResponse.fail(statusCode, message));
    }
  });
};

// Create specific rate limiters
const authLimiter = createRateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 requests per hour
  message: 'Too many login attempts, please try again after an hour'
});

const apiLimiter = createRateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requests per 15 minutes
});

export { createRateLimiter, authLimiter, apiLimiter }; 