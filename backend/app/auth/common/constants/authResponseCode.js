import { HTTP_STATUS, APP_STATUS } from '../../../common/constants/index.js';

export const successCode = {
	LOGGED_IN: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Logged in successfully',
		status: APP_STATUS.SUCCESS,
	},
	REGISTERED: {
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'User registered successfully',
		status: APP_STATUS.SUCCESS,
	},
	REGISTERED_VERIFY_CODE_SENT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Verification code sent to your email',
		status: APP_STATUS.SUCCESS,
	},
	EMAIL_VERIFIED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Email verified successfully',
		status: APP_STATUS.SUCCESS,
	},
	ACCESS_TOKEN_REFRESH: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Access token refreshed successfully',
		status: APP_STATUS.SUCCESS,
	},
	FORGOT_PASSWORD_VERIFY_EMAIL_SENT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password reset instructions sent to your email',
		status: APP_STATUS.SUCCESS,
	},
	LOGGED_OUT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Logged out successfully',
		status: APP_STATUS.SUCCESS,
	},
	PASSWORD_RESET_SUCCESS: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password reset successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_BLOCKED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User blocked successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_UNBLOCKED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User unblocked successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_PROFILE_UPDATED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User profile updated successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_PROFILE_FETCHED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User profile fetched successfully',
		status: APP_STATUS.SUCCESS,
	},
	BLOCKED_USERS_FETCHED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Blocked users fetched successfully',
		status: APP_STATUS.SUCCESS,
	},
};

export const errorCode = {
	USER_NOT_EXIST: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'User does not exist',
		status: APP_STATUS.FAIL,
	},
	USER_ALREADY_EXIST: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'User already exists',
		status: APP_STATUS.FAIL,
	},
	INVALID_PASSWORD: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid password',
		status: APP_STATUS.FAIL,
	},
	INVALID_TOKEN: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid token',
		status: APP_STATUS.FAIL,
	},
	TOKEN_EXPIRED: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Token has expired',
		status: APP_STATUS.FAIL,
	},
	INVALID_REFRESH_TOKEN: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid refresh token',
		status: APP_STATUS.FAIL,
	},
	UNAUTHORIZED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'You are not authorized to perform this action',
		status: APP_STATUS.FAIL,
	},
	FORBIDDEN: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Access forbidden',
		status: APP_STATUS.FAIL,
	},
	REFRESH_TOKEN_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Refresh token not found',
		status: APP_STATUS.FAIL,
	},
	VERIFY_TOKEN_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Verification token not found',
		status: APP_STATUS.FAIL,
	},
	VERIFY_TOKEN_EXPIRED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Verification token has expired',
		status: APP_STATUS.FAIL,
	},
	USER_ALREADY_VERIFIED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User already verified',
		status: APP_STATUS.FAIL,
	},
	INVALID_EMAIL_TEMPLATE: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid email template',
		status: APP_STATUS.FAIL,
	},
	PASSWORD_RESET_TOKEN_INVALID: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Password reset token is invalid',
		status: APP_STATUS.FAIL,
	},
	PASSWORD_RESET_TOKEN_EXPIRED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Password reset token has expired',
		status: APP_STATUS.FAIL,
	},
	EMAIL_ALREADY_EXISTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Email already exists',
		status: APP_STATUS.FAIL,
	},
	INVALID_CREDENTIALS: {
		httpStatusCode: HTTP_STATUS.UNAUTHORIZED,
		message: 'Invalid credentials',
		status: APP_STATUS.FAIL,
	},
	ACCOUNT_LOCKED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Account has been locked due to multiple failed attempts',
		status: APP_STATUS.FAIL,
	},
	USER_ALREADY_BLOCKED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User is already blocked',
		status: APP_STATUS.FAIL,
	},
	USER_NOT_BLOCKED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User is not blocked',
		status: APP_STATUS.FAIL,
	},
	USER_PASSWORD_INVALID: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User password is invalid',
		status: APP_STATUS.FAIL,
	},
	USER_EMAIL_INVALID: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User email is invalid',
		status: APP_STATUS.FAIL,
	},
	USER_FULL_NAME_INVALID: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'User full name is invalid',
		status: APP_STATUS.FAIL,
	},
};

export default {
	successCode,
	errorCode,
};
