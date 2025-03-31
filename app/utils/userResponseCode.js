export const successCode = {
	USER_CREATED: {
		code: 1,
		httpStatusCode: 201,
		message: 'User created',
	},
	USERS_GET_ALL: {
		code: 1,
		httpStatusCode: 200,
		message: 'Get users successfully',
	},
	USER_GET: {
		code: 1,
		httpStatusCode: 200,
		message: 'Get an user successfully',
	},
	USER_UPDATED: {
		code: 2,
		httpStatusCode: 200,
		message: 'User updated',
	},
	USER_DELETED: {
		code: 3,
		httpStatusCode: 200,
		message: 'User deleted',
	},
	ACCESS_TOKEN_REFRESH: {
		code: 4,
		httpStatusCode: 200,
		message: 'Access token refreshed',
	},
	LOGGED_IN: {
		code: 1,
		httpStatusCode: 200,
		message: 'Logged in',
	},
	USER_ADDED_FAVORITE_PRODUCT: {
		code: 1,
		httpStatusCode: 200,
		message: 'User added favorite product successfully',
	},
	USER_REMOVED_FAVORITE_PRODUCT: {
		code: 1,
		httpStatusCode: 200,
		message: 'User removed favorite product successfully',
	},
};

export const errorCode = {
	USER_EXISTS: {
		code: 101,
		httpStatusCode: 400,
		message: 'User exists',
	},
	USER_BAD_REQUEST: {
		code: 102,
		httpStatusCode: 400,
		message: 'User bad request',
	},
	USER_EMAIL_INVALID: {
		code: 103,
		httpStatusCode: 400,
		message: 'User email invalid',
	},
	USER_FULL_NAME_INVALID: {
		code: 104,
		httpStatusCode: 400,
		message: 'User full name invalid',
	},
	USER_PASSWORD_INVALID: {
		code: 105,
		httpStatusCode: 400,
		message: 'User password invalid',
	},
	USER_CATEGORY_INVALID: {
		code: 105,
		httpStatusCode: 400,
		message: 'User category invalid',
	},
	USER_NOT_FOUND: {
		code: 106,
		httpStatusCode: 404,
		message: 'User not found',
	},
	INVALID_PASSWORD: {
		code: 107,
		httpStatusCode: 400,
		message: 'Invalid password',
	},
	USER_ALREADY_EXISTS: {
		code: 108,
		httpStatusCode: 400,
		message: 'User already exists',
	},
	INTERNAL_SERVER_ERROR: {
		code: 13,
		httpStatusCode: 500,
		message: 'Internal server error',
	},
	INVALID_TOKEN: {
		code: 14,
		httpStatusCode: 401,
		message: 'Invalid token',
	},
	INVALID_REFRESH_TOKEN: {
		code: 14,
		httpStatusCode: 401,
		message: 'Invalid token',
	},
	UNAUTHORIZED: {
		code: 15,
		httpStatusCode: 403,
		message: 'You are not authorized to perform this action',
	},
	FORBIDDEN: {
		code: 16,
		httpStatusCode: 403,
		message: 'Access forbidden',
	},
	REFRESH_TOKEN_NOT_FOUND: {
		code: 17,
		httpStatusCode: 404,
		message: 'Refresh token not found',
	},
};
