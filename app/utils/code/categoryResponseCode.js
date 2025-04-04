/**
 * Category Response Codes
 * 
 * This file contains the response codes for category-related operations.
 */

import { HTTP_STATUS, APP_STATUS, commonSuccessCode, commonErrorCode } from './baseResponseCode.js';

// Category Success Codes (1-99)
export const successCode = {
	CATEGORY_CREATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'Category created successfully',
		status: 'success'
	},
	CATEGORIES_GET_ALL: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Categories retrieved successfully',
		status: 'success'
	},
	CATEGORY_GET: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category retrieved successfully',
		status: 'success'
	},
	CATEGORY_UPDATED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category updated successfully',
		status: 'success'
	},
	CATEGORY_DELETED: {
		code: APP_STATUS.SUCCESS,
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category deleted successfully',
		status: 'success'
	}
};

// Category Error Codes (600-699)
export const errorCode = {
	CATEGORY_BAD_REQUEST: {
		code: 600,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid category data',
		status: 'error'
	},
	CATEGORY_NAME_INVALID: {
		code: 601,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid category name format',
		status: 'error'
	},
	CATEGORY_NOT_FOUND: {
		code: 602,
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Category not found',
		status: 'error'
	},
	CATEGORY_ALREADY_EXISTS: {
		code: 603,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Category already exists',
		status: 'error'
	},
	CATEGORY_DELETE_FAILED: {
		code: 604,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete category',
		status: 'error'
	},
	CATEGORY_UPDATE_FAILED: {
		code: 605,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update category',
		status: 'error'
	},
	CATEGORY_CREATE_FAILED: {
		code: 606,
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create category',
		status: 'error'
	},
	CATEGORY_HAS_PRODUCTS: {
		code: 607,
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Cannot delete category with associated products',
		status: 'error'
	},
	CATEGORY_PARENT_INVALID: {
		code: 608,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid parent category',
		status: 'error'
	},
	CATEGORY_DESCRIPTION_INVALID: {
		code: 609,
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid category description',
		status: 'error'
	}
};

export default {
	successCode,
	errorCode
};
  