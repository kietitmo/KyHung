import { HTTP_STATUS, APP_STATUS } from './index.js';

// Rate Limiter Error Codes (200-299)
export const errorCode = {
	// Rate limit exceeded
	RATE_LIMIT_EXCEEDED: {
		httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
		message: 'Too many requests, please try again later.',
		status: APP_STATUS.ERROR,
	},

	// Authentication rate limit exceeded
	AUTH_RATE_LIMIT_EXCEEDED: {
		httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
		message: 'Too many authentication attempts, please try again later.',
		status: APP_STATUS.ERROR,
	},

	// IP blocked
	IP_BLOCKED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Your IP has been blocked due to excessive requests.',
		status: APP_STATUS.ERROR,
	},

	// Rate limit window reset
	RATE_LIMIT_RESET: {
		httpStatusCode: HTTP_STATUS.TOO_MANY_REQUESTS,
		message: 'Rate limit will reset in {time} seconds.',
		status: APP_STATUS.ERROR,
	},
	USER_UNAUTHORIZED_FIELD_UPDATE: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'You are not authorized to update this field.',
		status: APP_STATUS.ERROR,
	},
	UNKNOWN_VALIDATOR_TYPE: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Unknown validator type',
		status: APP_STATUS.ERROR,
	},
	USER_REQUIRED_FIELDS_MISSING: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Required fields are missing',
		status: APP_STATUS.ERROR,
	},
	BAD_REQUEST: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Bad request',
		status: APP_STATUS.ERROR,
	},
};

// Rate Limiter Success Codes
export const successCode = {
	RATE_LIMIT_RESET_SUCCESS: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Rate limit has been reset successfully.',
		status: APP_STATUS.SUCCESS,
	},
};

export default {
	errorCode,
	successCode,
};
