export const errorCode = {
	FILE_UPLOAD_FAILED: {
		code: 'FILE_UPLOAD_FAILED',
		message: 'Failed to upload file',
		httpStatusCode: 500,
	},
	FILE_DELETE_FAILED: {
		code: 'FILE_DELETE_FAILED',
		message: 'Failed to delete file',
		httpStatusCode: 500,
	},
	INVALID_FILE_TYPE: {
		code: 'INVALID_FILE_TYPE',
		message: 'Invalid file type. Only images and videos are allowed',
		httpStatusCode: 400,
	},
	FILE_TOO_LARGE: {
		code: 'FILE_TOO_LARGE',
		message: 'File size too large',
		httpStatusCode: 400,
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
