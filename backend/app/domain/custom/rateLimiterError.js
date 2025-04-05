import CustomError from './customError.js';
import { errorCode } from '../../utils/code/rateLimiterResponseCode.js';

/**
 * Custom error class for rate limiter errors
 * @extends CustomError
 */
class RateLimiterError extends CustomError {
  /**
   * Create a rate limiter error
   * @param {string} type - The type of rate limiter error
   */
  constructor(type = 'RATE_LIMIT_EXCEEDED') {
    const error = errorCode[type] || errorCode.RATE_LIMIT_EXCEEDED;
    super(error);
    this.name = 'RateLimiterError';
    this.statusCode = error.code;
    this.status = error.status;
    this.message = error.message;
  }
}

export default RateLimiterError; 