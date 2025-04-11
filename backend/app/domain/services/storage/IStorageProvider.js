/**
 * Interface for storage providers
 */
class IStorageProvider {
	/**
	 * Upload a file to storage
	 * @param {Object} file - The file to upload
	 * @param {string} folder - The folder to upload to
	 * @returns {Promise<string>} The URL of the uploaded file
	 */
	async uploadFile(file, folder) {
		throw new Error('Method not implemented');
	}

	/**
	 * Upload multiple files to storage
	 * @param {Array<Object>} files - Array of files to upload
	 * @param {string} folder - The folder to upload to
	 * @returns {Promise<Array<string>>} Array of URLs of the uploaded files
	 */
	async uploadFiles(files, folder) {
		throw new Error('Method not implemented');
	}

	/**
	 * Delete a file from storage
	 * @param {string} fileUrl - The URL of the file to delete
	 * @returns {Promise<boolean>} True if deletion was successful
	 */
	async deleteFile(fileUrl) {
		throw new Error('Method not implemented');
	}

	/**
	 * Delete multiple files from storage
	 * @param {Array<string>} fileUrls - Array of file URLs to delete
	 * @returns {Promise<boolean>} True if all deletions were successful
	 */
	async deleteFiles(fileUrls) {
		throw new Error('Method not implemented');
	}
}

export default IStorageProvider;
