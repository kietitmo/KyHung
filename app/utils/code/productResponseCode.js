/**
 * Product Response Codes
 * 
 * This file contains the response codes for product-related operations.
 */

import { HTTP_STATUS, APP_STATUS, commonSuccessCode, commonErrorCode } from './baseResponseCode.js';

// Product Success Codes (1-99)
export const successCode = {
	PRODUCT_CREATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'Product created successfully',
		status: 'success'
	},
	PRODUCTS_GET_ALL: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Products retrieved successfully',
		status: 'success'
	},
	PRODUCT_GET: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product retrieved successfully',
		status: 'success'
	},
	PRODUCT_UPDATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product updated successfully',
		status: 'success'
	},
	PRODUCT_DELETED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product deleted successfully',
		status: 'success'
	},
	PRODUCT_ADDED_TO_FAVORITES: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product added to favorites successfully',
		status: 'success'
	},
	PRODUCT_REMOVED_FROM_FAVORITES: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product removed from favorites successfully',
		status: 'success'
	}
};

// Product Error Codes (500-599)
export const errorCode = {
	PRODUCT_BAD_REQUEST: {
		code: 500,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid product data',
		status: 'error'
	},
	PRODUCT_NAME_INVALID: {
		code: 501,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product name format',
		status: 'error'
	},
	PRODUCT_NOT_FOUND: {
		code: 502,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product not found',
		status: 'error'
	},
	PRODUCT_ALREADY_EXISTS: {
		code: 503,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Product already exists',
		status: 'error'
	},
	PRODUCT_ALREADY_IN_FAVORITE: {
		code: 504,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Product is already in favorites',
		status: 'error'
	},
	PRODUCT_NOT_IN_FAVORITE: {
		code: 505,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product is not in favorites',
		status: 'error'
	},
	PRODUCT_PRICE_INVALID: {
		code: 506,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product price',
		status: 'error'
	},
	PRODUCT_IMAGE_URL_INVALID: {
		code: 507,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product image URL',
		status: 'error'
	},
	PRODUCT_VIDEO_URL_INVALID: {
		code: 508,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product video URL',
		status: 'error'
	},
	PRODUCT_CATEGORY_INVALID: {
		code: 509,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product category',
		status: 'error'
	},
	PRODUCT_DELETE_FAILED: {
		code: 510,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete product',
		status: 'error'
	},
	PRODUCT_UPDATE_FAILED: {
		code: 511,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update product',
		status: 'error'
	},
	PRODUCT_CREATE_FAILED: {
		code: 512,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create product',
		status: 'error'
	}
};

export default {
	successCode,
	errorCode
};
