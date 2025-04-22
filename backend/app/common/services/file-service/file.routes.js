// import express from 'express';
// import FileController from './file.controller.js';
// import { upload, handleFileUploadError } from './file.middleware.js';
// import { verifyAccessToken } from '../../auth/entry-points/middlewares/auth.middleware.js';

// const router = express.Router();
// const fileController = new FileController();

// /**
//  * @swagger
//  * /api/files/upload:
//  *   post:
//  *     tags: [Files]
//  *     summary: Upload a single file
//  *     description: Upload a single file to the server
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               file:
//  *                 type: string
//  *                 format: binary
//  *                 description: File to upload
//  *               folder:
//  *                 type: string
//  *                 description: Folder to store the file (default: 'uploads')
//  *     responses:
//  *       200:
//  *         description: File uploaded successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: success
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     fileUrl:
//  *                       type: string
//  *       400:
//  *         description: Invalid file or file too large
//  *       401:
//  *         description: Unauthorized
//  */
// router.post(
// 	'/upload',
// 	verifyAccessToken,
// 	upload.single('file'),
// 	handleFileUploadError,
// 	fileController.uploadFile.bind(fileController)
// );

// /**
//  * @swagger
//  * /api/files/delete:
//  *   delete:
//  *     tags: [Files]
//  *     summary: Delete a file
//  *     description: Delete a file from the server
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - fileUrl
//  *             properties:
//  *               fileUrl:
//  *                 type: string
//  *                 description: URL of the file to delete
//  *     responses:
//  *       200:
//  *         description: File deleted successfully
//  *       400:
//  *         description: Invalid file URL
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: File not found
//  */
// router.delete(
// 	'/delete',
// 	verifyAccessToken,
// 	fileController.deleteFile.bind(fileController)
// );

// /**
//  * @swagger
//  * /api/files/upload-multiple:
//  *   post:
//  *     tags: [Files]
//  *     summary: Upload multiple files
//  *     description: Upload multiple files to the server
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - files
//  *             properties:
//  *               files:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                   format: binary
//  *                 description: Files to upload
//  *     responses:
//  *       200:
//  *         description: Files uploaded successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 status:
//  *                   type: string
//  *                   example: success
//  *                 data:
//  *                   type: object
//  *                   properties:
//  *                     fileUrls:
//  *                       type: array
//  *                       items:
//  *                         type: string
//  *       400:
//  *         description: Invalid files
//  *       401:
//  *         description: Unauthorized
//  */
// router.post(
// 	'/upload-multiple',
// 	verifyAccessToken,
// 	upload.array('files', 10),
// 	handleFileUploadError,
// 	fileController.uploadFiles.bind(fileController)
// );

// /**
//  * @swagger
//  * /api/files/delete-multiple:
//  *   delete:
//  *     tags: [Files]
//  *     summary: Delete multiple files
//  *     description: Delete multiple files from the server
//  *     security:
//  *       - bearerAuth: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - fileUrls
//  *             properties:
//  *               fileUrls:
//  *                 type: array
//  *                 items:
//  *                   type: string
//  *                 description: URLs of the files to delete
//  *     responses:
//  *       200:
//  *         description: Files deleted successfully
//  *       400:
//  *         description: Invalid file URLs
//  *       401:
//  *         description: Unauthorized
//  *       404:
//  *         description: One or more files not found
//  */
// router.delete(
// 	'/delete-multiple',
// 	verifyAccessToken,
// 	fileController.deleteFiles.bind(fileController)
// );

// export default router;
