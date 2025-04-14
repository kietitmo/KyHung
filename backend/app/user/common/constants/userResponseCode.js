import { HTTP_STATUS, APP_STATUS } from '../../../common/constants/index.js';

export const successCode = {
	USER_CREATED: {
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'User created successfully',
		status: APP_STATUS.SUCCESS,
	},
	USERS_GET_ALL: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Users retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_GET: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_UPDATED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User updated successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_DELETED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User deleted successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_ADDED_FAVORITE_PRODUCT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product added to favorites successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_REMOVED_FAVORITE_PRODUCT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product removed from favorites successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_PROFILE_UPDATED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User profile updated successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_PASSWORD_CHANGED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Password changed successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_GET_FAVORITE_PRODUCTS: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Favorite products retrieved successfully',
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
	BLOCKED_USERS_FETCHED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Blocked users retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
};

export const errorCode = {
	USER_EXISTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'User already exists',
		status: APP_STATUS.ERROR,
	},
	USER_BAD_REQUEST: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid user data',
		status: APP_STATUS.ERROR,
	},
	USER_EMAIL_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid email format',
		status: APP_STATUS.ERROR,
	},
	USER_FULL_NAME_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid full name format',
		status: APP_STATUS.ERROR,
	},
	USER_PASSWORD_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Password does not meet requirements',
		status: APP_STATUS.ERROR,
	},
	USER_CATEGORY_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user category',
		status: APP_STATUS.ERROR,
	},
	USER_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'User not found',
		status: APP_STATUS.ERROR,
	},
	USER_ALREADY_EXISTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'User already exists',
		status: APP_STATUS.ERROR,
	},
	USER_INACTIVE: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is inactive',
		status: APP_STATUS.ERROR,
	},
	USER_BLOCKED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is blocked',
		status: APP_STATUS.ERROR,
	},
	USER_DELETE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete user',
		status: APP_STATUS.ERROR,
	},
	USER_UPDATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update user',
		status: APP_STATUS.ERROR,
	},
	USER_CREATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create user',
		status: APP_STATUS.ERROR,
	},
	USER_PROFILE_UPDATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update user profile',
		status: APP_STATUS.ERROR,
	},
	USER_PASSWORD_CHANGE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to change password',
		status: APP_STATUS.ERROR,
	},
	USER_NOT_VERIFIED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User account is not verified',
		status: APP_STATUS.ERROR,
	},
	FORBIDDEN: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'Forbidden',
		status: APP_STATUS.ERROR,
	},
	USER_ROLE_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user role',
		status: APP_STATUS.ERROR,
	},
	USER_VERIFIED_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user verified',
		status: APP_STATUS.ERROR,
	},
	USER_PHONE_NUMBER_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user phone number',
		status: APP_STATUS.ERROR,
	},
	USER_ADDRESS_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user address',
		status: APP_STATUS.ERROR,
	},
	USER_CITY_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user city',
		status: APP_STATUS.ERROR,
	},
	USER_GENDER_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user gender',
		status: APP_STATUS.ERROR,
	},
	USER_COUNTRY_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user country',
		status: APP_STATUS.ERROR,
	},
	USER_IS_BLOCKED_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user is blocked',
		status: APP_STATUS.ERROR,
	},
	USER_BLOCKED_REASON_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid user blocked reason',
		status: APP_STATUS.ERROR,
	},
	USER_NOT_BLOCKED: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'User is not blocked',
		status: APP_STATUS.ERROR,
	},
	USER_ALREADY_BLOCKED: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'User is already blocked',
		status: APP_STATUS.ERROR,
	},
	PAGE_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid page',
		status: APP_STATUS.ERROR,
	},
	LIMIT_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid limit',
		status: APP_STATUS.ERROR,
	},
	SORT_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid sort',
		status: APP_STATUS.ERROR,
	},
	FILTER_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid filter',
		status: APP_STATUS.ERROR,
	},
};

export default {
	successCode,
	errorCode,
};
