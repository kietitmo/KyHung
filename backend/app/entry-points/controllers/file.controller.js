import FileService from '../../domain/services/file.service.js';
import { successCode } from '../../utils/code/fileResponseCode.js';
import BaseController from './base.controller.js';

class FileController extends BaseController {
	constructor() {
		super();
		this.fileService = new FileService();
	}

	async uploadFile(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			if (!req.file) {
				throw new CustomError(errorCode.FILE_UPLOAD_FAILED);
			}

			const folder = req.body.folder || 'uploads';
			const fileUrl = await this.fileService.uploadFile(req.file, folder);

			this.sendSuccess(
				res,
				successCode.FILE_UPLOADED.code,
				successCode.FILE_UPLOADED.message,
				{ fileUrl },
				successCode.FILE_UPLOADED.httpStatusCode
			);
		});
	}

	async deleteFile(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const { fileUrl } = req.body;

			if (!fileUrl) {
				throw new CustomError(errorCode.FILE_DELETE_FAILED);
			}

			await this.fileService.deleteFile(fileUrl);

			this.sendSuccess(
				res,
				successCode.FILE_DELETED.code,
				successCode.FILE_DELETED.message,
				null,
				successCode.FILE_DELETED.httpStatusCode
			);
		});
	}

	async uploadFiles(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const { files } = req.body;
			const fileUrls = await this.fileService.uploadFiles(files);

			this.sendSuccess(
				res,
				successCode.FILE_UPLOADED.code,
				successCode.FILE_UPLOADED.message,
				{ fileUrls },
				successCode.FILE_UPLOADED.httpStatusCode
			);
		});
	}

	async deleteFiles(req, res, next) {
		await this.handleAsync(req, res, next, async () => {
			const { fileUrls } = req.body;

			if (!fileUrls) {
				throw new CustomError(errorCode.FILE_DELETE_FAILED);
			}

			await this.fileService.deleteFiles(fileUrls);

			this.sendSuccess(
				res,
				successCode.FILE_DELETED.code,
				successCode.FILE_DELETED.message,
				null,
				successCode.FILE_DELETED.httpStatusCode
			);
		});
	}
}

export default FileController;
