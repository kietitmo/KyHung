import multer from 'multer';
import CustomError from '../../domain/custom/customError.js';
import { errorCode } from '../../utils/code/fileResponseCode.js';
import env from '../../config/env.js';

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
	// Allow images and videos
	if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
		cb(null, true);
	} else {
		cb(new CustomError(errorCode.INVALID_FILE_TYPE), false);
	}
};

// Create multer upload instance
const upload = multer({
	storage: storage,
	fileFilter: fileFilter,
	limits: {
		fileSize: env.MAX_FILE_SIZE || 5 * 1024 * 1024, // 5MB default
	},
});

// Middleware to handle file upload errors
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
