export const successCode = {
	LOGGED_IN: {
		code: 1,
		httpStatusCode: 201,
		message: 'User created',
	},
	REGISTERED_VERIFY_CODE_SENT: {
		code: 1,
		httpStatusCode: 200,
		message: 'Verified token is sent to your email',
	},
	EMAIL_VERIFIED: {
		code: 1,
		httpStatusCode: 200,
		message: 'email verified successfully',
	},
	ACCESS_TOKEN_REFRESH: {
		code: 1,
		httpStatusCode: 200,
		message: 'Access token is refreshed successfully',
	},
	FORGOT_PASSWORD_VERIFY_EMAIL_SENT: {
		code: 1,
		httpStatusCode: 200,
		message: 'Forgot password letter is sent to your email',
	},
};

export const errorCode = {
	USER_NOT_EXIST: {
		code: 14,
		httpStatusCode: 401,
		message: 'user not exist',
	},
	INVALID_PASSWORD: {
		code: 14,
		httpStatusCode: 401,
		message: 'Invalid password',
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
	VERIFY_TOKEN_NOT_FOUND: {
		code: 17,
		httpStatusCode: 404,
		message: 'verify token not found',
	},
	VERIFY_TOKEN_EXPIRED: {
		code: 17,
		httpStatusCode: 404,
		message: 'verify token expired',
	},
	USER_ALREADY_VERIFIED: {
		code: 17,
		httpStatusCode: 404,
		message: 'User already verified',
	},
	INVALID_EMAIL_TEMPLATE: {
		code: 14,
		httpStatusCode: 401,
		message: 'Invalid email template',
	},
};
