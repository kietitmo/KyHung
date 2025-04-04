/**
 * Authentication Response Codes
 * 
 * This file contains the response codes for authentication-related operations.
 */

import { HTTP_STATUS, APP_STATUS, commonSuccessCode, commonErrorCode } from './baseResponseCode.js';

// Auth Success Codes (1-99)
export const successCode = {
	LOGGED_IN: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Logged in successfully',
		status: 'success'
	},
	REGISTERED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'User registered successfully',
		status: 'success'
	},
	REGISTERED_VERIFY_CODE_SENT: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Verification code sent to your email',
		status: 'success'
	},
	EMAIL_VERIFIED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Email verified successfully',
		status: 'success'
	},
	ACCESS_TOKEN_REFRESH: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Access token refreshed successfully',
		status: 'success'
	},
	FORGOT_PASSWORD_VERIFY_EMAIL_SENT: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password reset instructions sent to your email',
		status: 'success'
	},
	LOGGED_OUT: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Logged out successfully',
		status: 'success'
	},
	PASSWORD_RESET_SUCCESS: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password reset successfully',
		status: 'success'
	}
};

// Auth Error Codes (300-399)
export const errorCode = {
	USER_NOT_EXIST: {
		code: 300,
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'User does not exist',
		status: 'error'
	},
	INVALID_PASSWORD: {
		code: 301,
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid password',
		status: 'error'
	},
	INVALID_TOKEN: {
		code: 302,
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid token',
		status: 'error'
	},
	INVALID_REFRESH_TOKEN: {
		code: 303,
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid refresh token',
		status: 'error'
	},
	UNAUTHORIZED: {
		code: 304,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'You are not authorized to perform this action',
		status: 'error'
	},
	FORBIDDEN: {
		code: 305,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Access forbidden',
		status: 'error'
	},
	REFRESH_TOKEN_NOT_FOUND: {
		code: 306,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Refresh token not found',
		status: 'error'
	},
	VERIFY_TOKEN_NOT_FOUND: {
		code: 307,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Verification token not found',
		status: 'error'
	},
	VERIFY_TOKEN_EXPIRED: {
		code: 308,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Verification token has expired',
		status: 'error'
	},
	USER_ALREADY_VERIFIED: {
		code: 309,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User already verified',
		status: 'error'
	},
	INVALID_EMAIL_TEMPLATE: {
		code: 310,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid email template',
		status: 'error'
	},
	PASSWORD_RESET_TOKEN_INVALID: {
		code: 311,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Password reset token is invalid',
		status: 'error'
	},
	PASSWORD_RESET_TOKEN_EXPIRED: {
		code: 312,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Password reset token has expired',
		status: 'error'
	},
	EMAIL_ALREADY_EXISTS: {
		code: 313,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Email already exists',
		status: 'error'
	},
	INVALID_CREDENTIALS: {
		code: 314,
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid credentials',
		status: 'error'
	},
	ACCOUNT_LOCKED: {
		code: 315,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Account has been locked due to multiple failed attempts',
		status: 'error'
	}
};

export default {
	successCode,
	errorCode
};
