class IStorageProvider {
	async uploadFile(file, folder) {
		throw new Error('Method not implemented');
	}

	async uploadFiles(files, folder) {
		throw new Error('Method not implemented');
	}

	async deleteFile(fileUrl) {
		throw new Error('Method not implemented');
	}

	async deleteFiles(fileUrls) {
		throw new Error('Method not implemented');
	}
}

export default IStorageProvider;
