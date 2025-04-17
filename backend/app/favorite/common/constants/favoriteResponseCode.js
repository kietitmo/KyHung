import { HTTP_STATUS, APP_STATUS } from '../../../common/constants/index.js';

// Product Success Codes (1-99)
export const successCode = {
	USER_ADDED_FAVORITE_PRODUCT: {
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'User added favorite product successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_REMOVED_FAVORITE_PRODUCT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User removed favorite product successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_UPDATED_FAVORITE_PRODUCT: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User updated favorite product successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_GET_FAVORITE_PRODUCTS: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User get favorite products successfully',
		status: APP_STATUS.SUCCESS,
	},
	USER_REMOVED_ALL_FAVORITE_PRODUCTS: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'User removed all favorite products successfully',
		status: APP_STATUS.SUCCESS,
	},
};

// Product Error Codes (500-599)
export const errorCode = {
	USER_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'User not found',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product not found',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_ALREADY_IN_FAVORITE: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Product already in favorite',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NOT_IN_FAVORITE: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product not in favorite',
		status: APP_STATUS.ERROR,
	},
	USER_NOT_AUTHORIZED: {
		httpStatusCode: HTTP_STATUS.FORBIDDEN,
		message: 'User not authorized',
		status: APP_STATUS.ERROR,
	},
	GET_FAVORITE_PRODUCT_ERROR: {
		httpStatusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		message: 'Get favorite product error',
		status: APP_STATUS.ERROR,
	},
};

export default {
	successCode,
	errorCode,
};
