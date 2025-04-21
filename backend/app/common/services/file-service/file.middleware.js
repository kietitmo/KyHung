import multer from 'multer';
import CustomError from '../../custom/error/customError.js';
import { errorCode } from './fileResponseCode.js';
import env from '../../config/env.js';

const storage = multer.memoryStorage();

const _validateFileType = (mimetype) => {
	const allowedImageTypes = [
		'image/jpeg',
		'image/png',
		'image/gif',
		'image/webp',
	];
	const allowedVideoTypes = ['video/mp4', 'video/webm', 'video/quicktime'];

	if (
		!allowedImageTypes.includes(mimetype) &&
		!allowedVideoTypes.includes(mimetype)
	) {
		console.log(`Rejected file with invalid mimetype: ${mimetype}`);
		throw new CustomError(errorCode.INVALID_FILE_TYPE);
	}

	return true;
};

const _fileFilter = (req, file, cb) => {
	if (_validateFileType(file.mimetype)) {
		cb(null, true);
	} else {
		cb(new CustomError(errorCode.INVALID_FILE_TYPE), false);
	}
};

const upload = multer({
	storage: storage,
	fileFilter: _fileFilter,
	limits: {
		fileSize: env.MAX_FILE_SIZE || 5 * 1024 * 1024,
	},
});

const handleFileUploadError = (err, req, res, next) => {
	if (err instanceof multer.MulterError) {
		if (err.code === 'LIMIT_FILE_SIZE') {
			return next(new CustomError(errorCode.FILE_TOO_LARGE));
		}
		return next(new CustomError(errorCode.FILE_UPLOAD_FAILED));
	}
	next(err);
};

export { upload, handleFileUploadError };
