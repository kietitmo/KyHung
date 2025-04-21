export const errorCode = {
	// === File operation errors ===
	FILE_UPLOAD_FAILED: {
		message: 'Failed to upload file',
		httpStatusCode: 500,
	},
	FILE_DELETE_FAILED: {
		message: 'Failed to delete file',
		httpStatusCode: 500,
	},
	INVALID_FILE_TYPE: {
		message: 'Invalid file type. Only images and videos are allowed',
		httpStatusCode: 400,
	},
	FILE_TOO_LARGE: {
		message: 'File size too large',
		httpStatusCode: 400,
	},

	// === Storage-specific errors ===
	ACCESS_DENIED: {
		message: 'Access denied to cloud storage',
		httpStatusCode: 403,
	},
	AUTHORIZATION_HEADER_MALFORMED: {
		message: 'Invalid storage credentials',
		httpStatusCode: 400,
	},
	INVALID_ACCESS_KEY_ID: {
		message: 'Invalid storage access key',
		httpStatusCode: 401,
	},
	SIGNATURE_DOES_NOT_MATCH: {
		message: 'Invalid storage signature',
		httpStatusCode: 401,
	},
	NO_SUCH_BUCKET: {
		message: 'Storage bucket not found',
		httpStatusCode: 404,
	},
	NO_SUCH_KEY: {
		message: 'File not found in storage',
		httpStatusCode: 404,
	},
	INVALID_BUCKET_NAME: {
		message: 'Invalid storage bucket name',
		httpStatusCode: 400,
	},
	INVALID_REQUEST: {
		message: 'Invalid storage request',
		httpStatusCode: 400,
	},
	ENTITY_TOO_LARGE: {
		message: 'File too large for cloud storage',
		httpStatusCode: 413,
	},
	SLOW_DOWN: {
		message: 'Too many storage requests, please retry',
		httpStatusCode: 429,
	},
	TOO_MANY_REQUESTS: {
		message: 'Rate limit exceeded for storage operations',
		httpStatusCode: 429,
	},
	INSUFFICIENT_STORAGE_SPACE: {
		message: 'Insufficient storage space',
		httpStatusCode: 507,
	},
	ECONNRESET: {
		message: 'Connection reset during storage operation',
		httpStatusCode: 500,
	},
	ETIMEDOUT: {
		message: 'Storage operation timed out',
		httpStatusCode: 500,
	},
};

export const successCode = {
	FILE_UPLOADED: {
		code: 'FILE_UPLOADED',
		message: 'File uploaded successfully',
		httpStatusCode: 200,
	},
	FILE_DELETED: {
		code: 'FILE_DELETED',
		message: 'File deleted successfully',
		httpStatusCode: 200,
	},
};
