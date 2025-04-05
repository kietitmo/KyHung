/**
 * Rate Limiter Response Codes
 * 
 * This file contains the response codes for rate limiter errors.
 * These codes are used to standardize error messages when rate limiting is triggered.
 */

import { HTTP_STATUS, commonErrorCode } from './baseResponseCode.js';

// Rate Limiter Error Codes (200-299)
export const errorCode = {
  // Rate limit exceeded
  RATE_LIMIT_EXCEEDED: {
    code: 200,
    httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message: 'Too many requests, please try again later.',
    status: 'error'
  },
  
  // Authentication rate limit exceeded
  AUTH_RATE_LIMIT_EXCEEDED: {
    code: 201,
    httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message: 'Too many authentication attempts, please try again later.',
    status: 'error'
  },
  
  // IP blocked
  IP_BLOCKED: {
    code: 202,
    httpStatusCode: HTTP_STATUS.FORBIDDEN,
    message: 'Your IP has been blocked due to excessive requests.',
    status: 'error'
  },
  
  // Rate limit window reset
  RATE_LIMIT_RESET: {
    code: 203,
    httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
    message: 'Rate limit will reset in {time} seconds.',
    status: 'error'
  }
};

// Rate Limiter Success Codes
export const successCode = {
  RATE_LIMIT_RESET_SUCCESS: {
    code: 1,
    httpStatusCode: HTTP_STATUS.OK,
    message: 'Rate limit has been reset successfully.',
    status: 'success'
  }
};

export default {
  errorCode,
  successCode
}; 