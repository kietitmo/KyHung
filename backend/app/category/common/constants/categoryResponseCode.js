import { HTTP_STATUS, APP_STATUS } from '../../../common/constants/index.js';

export const successCode = {
	CATEGORY_CREATED: {
		httpStatusCode: HTTP_STATUS.CREATED,
		message: 'Category created successfully',
		status: APP_STATUS.SUCCESS,
	},
	CATEGORIES_GET_ALL: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Categories retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	CATEGORY_GET: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category retrieved successfully',
		status: APP_STATUS.SUCCESS,
	},
	CATEGORY_UPDATED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category updated successfully',
		status: APP_STATUS.SUCCESS,
	},
	CATEGORY_DELETED: {
		httpStatusCode: HTTP_STATUS.OK,
		message: 'Category deleted successfully',
		status: APP_STATUS.SUCCESS,
	},
};

export const errorCode = {
	CATEGORY_BAD_REQUEST: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Invalid category data',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_NAME_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid category name format',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_NOT_FOUND: {
		httpStatusCode: HTTP_STATUS.NOT_FOUND,
		message: 'Category not found',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_ALREADY_EXISTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Category already exists',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_DELETE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to delete category',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_UPDATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to update category',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_CREATE_FAILED: {
		httpStatusCode: HTTP_STATUS.BAD_REQUEST,
		message: 'Failed to create category',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_HAS_PRODUCTS: {
		httpStatusCode: HTTP_STATUS.CONFLICT,
		message: 'Cannot delete category with associated products',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_PARENT_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid parent category',
		status: APP_STATUS.ERROR,
	},
	CATEGORY_DESCRIPTION_INVALID: {
		httpStatusCode: HTTP_STATUS.UNPROCESSABLE_ENTITY,
		message: 'Invalid category description',
		status: APP_STATUS.ERROR,
	},
};

export default {
	successCode,
	errorCode,
};
