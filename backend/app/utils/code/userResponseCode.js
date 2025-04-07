/**
 * User Response Codes
 *
 * This file contains the response codes for user-related operations.
 */

import {
	HTTP_STATUS,
	APP_STATUS,
	commonSuccessCode,
	commonErrorCode,
} from './baseResponseCode.js';

// User Success Codes (1-99)
export const successCode = {
	USER_CREATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'User created successfully',
		status: 'success',
	},
	USERS_GET_ALL: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Users retrieved successfully',
		status: 'success',
	},
	USER_GET: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User retrieved successfully',
		status: 'success',
	},
	USER_UPDATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User updated successfully',
		status: 'success',
	},
	USER_DELETED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User deleted successfully',
		status: 'success',
	},
	USER_ADDED_FAVORITE_PRODUCT: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product added to favorites successfully',
		status: 'success',
	},
	USER_REMOVED_FAVORITE_PRODUCT: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product removed from favorites successfully',
		status: 'success',
	},
	USER_PROFILE_UPDATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User profile updated successfully',
		status: 'success',
	},
	USER_PASSWORD_CHANGED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password changed successfully',
		status: 'success',
	},
	USER_GET_FAVORITE_PRODUCTS: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Favorite products retrieved successfully',
		status: 'success',
	},
};

// User Error Codes (400-499)
export const errorCode = {
	USER_EXISTS: {
		code: 400,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'User already exists',
		status: 'error',
	},
	USER_BAD_REQUEST: {
		code: 401,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid user data',
		status: 'error',
	},
	USER_EMAIL_INVALID: {
		code: 402,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid email format',
		status: 'error',
	},
	USER_FULL_NAME_INVALID: {
		code: 403,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid full name format',
		status: 'error',
	},
	USER_PASSWORD_INVALID: {
		code: 404,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Password does not meet requirements',
		status: 'error',
	},
	USER_CATEGORY_INVALID: {
		code: 405,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user category',
		status: 'error',
	},
	USER_NOT_FOUND: {
		code: 406,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'User not found',
		status: 'error',
	},
	USER_ALREADY_EXISTS: {
		code: 407,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'User already exists',
		status: 'error',
	},
	USER_INACTIVE: {
		code: 408,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is inactive',
		status: 'error',
	},
	USER_BLOCKED: {
		code: 409,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is blocked',
		status: 'error',
	},
	USER_DELETE_FAILED: {
		code: 410,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete user',
		status: 'error',
	},
	USER_UPDATE_FAILED: {
		code: 411,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update user',
		status: 'error',
	},
	USER_CREATE_FAILED: {
		code: 412,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create user',
		status: 'error',
	},
	USER_PROFILE_UPDATE_FAILED: {
		code: 413,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update user profile',
		status: 'error',
	},
	USER_PASSWORD_CHANGE_FAILED: {
		code: 414,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to change password',
		status: 'error',
	},
	USER_NOT_VERIFIED: {
		code: 415,
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is not verified',
		status: 'error',
	},
};

export default {
	successCode,
	errorCode,
};
