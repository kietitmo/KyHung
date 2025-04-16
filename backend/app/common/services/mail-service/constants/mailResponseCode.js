import { HTTP_STATUS, APP_STATUS } from '../../../constants/index.js';

// Rate Limiter Error Codes (200-299)
export const errorCode = {
	// Rate limit exceeded
	INVALID_EMAIL_TEMPLATE: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid email template',
		status: APP_STATUS.ERROR,
	},
};
