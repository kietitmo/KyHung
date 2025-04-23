import StorageProviderFactory from './storage/StorageProviderFactory.js';

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
}

export default FileService;
