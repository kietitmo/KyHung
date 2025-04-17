import { HTTP_STATUS, APP_STATUS } from '../../../common/constants/index.js';

// Product Success Codes (1-99)
export const successCode = {
	PRODUCT_CREATED: {
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'Product created successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCTS_GET_ALL: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Products retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_GET: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_UPDATED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product updated successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_DELETED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product deleted successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_ADDED_TO_FAVORITES: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product added to favorites successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_REMOVED_FROM_FAVORITES: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product removed from favorites successfully',
		status: APP_STATUS.SUCCESS,
	},
	PRODUCT_GET_BY_ID: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Product retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
};

// Product Error Codes (500-599)
export const errorCode = {
	PRODUCT_BAD_REQUEST: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid product data',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NAME_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product name format',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product not found',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_ALREADY_EXISTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Product already exists',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_ALREADY_IN_FAVORITE: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Product is already in favorites',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NOT_IN_FAVORITE: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Product is not in favorites',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_PRICE_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product price',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_IMAGE_URL_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product image URL',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_VIDEO_URL_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product video URL',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_CATEGORY_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product category',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_DESCRIPTION_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product description',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_UPDATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update product',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_CREATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create product',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_DELETE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete product',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_NAME_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product name',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_CATEGORY_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product category',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_PRICE_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product price',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_DESCRIPTION_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product description',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_IMAGE_URL_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product image URL',
		status: APP_STATUS.ERROR,
	},
	PRODUCT_VIDEO_URL_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid product video URL',
		status: APP_STATUS.ERROR,
	},
};

export default {
	successCode,
	errorCode,
};
