import express from 'express';
import FileController from '../controllers/file.controller.js';
import {
	upload,
	handleFileUploadError,
} from '../middlewares/file.middleware.js';
import { verifyAccessToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
const fileController = new FileController();

// Upload file route
router.post(
	'/upload',
	verifyAccessToken,
	upload.single('file'),
	handleFileUploadError,
	fileController.uploadFile.bind(fileController)
);

// Delete file route
router.delete(
	'/delete',
	verifyAccessToken,
	fileController.deleteFile.bind(fileController)
);

export default router;
