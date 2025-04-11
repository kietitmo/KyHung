import StorageProviderFactory from './storage/StorageProviderFactory.js';
import CustomError from '../custom/customError.js';
import { errorCode } from '../../utils/code/fileResponseCode.js';
import env from '../../config/env.js';

class FileService {
	constructor() {
		this.storageProvider = StorageProviderFactory.createProvider();
	}

	async uploadFile(file, folder = 'uploads') {
		return this.storageProvider.uploadFile(file, folder);
	}

	async deleteFile(fileUrl) {
		return this.storageProvider.deleteFile(fileUrl);
	}

	async uploadFiles(files, folder = 'uploads') {
		return this.storageProvider.uploadFiles(files, folder);
	}

	async deleteFiles(fileUrls) {
		return this.storageProvider.deleteFiles(fileUrls);
	}
}

export default FileService;
