import { Storage } from '@google-cloud/storage';
import CustomError from '../../custom/customError.js';
import { errorCode } from '../../../utils/code/fileResponseCode.js';
import env from '../../../config/env.js';
import IStorageProvider from './IStorageProvider.js';

class GCSStorageProvider extends IStorageProvider {
	constructor() {
		super();
		this.storage = new Storage({
			keyFilename: env.GCS_KEY_FILE,
			projectId: env.GCS_PROJECT_ID,
		});
		this.bucket = this.storage.bucket(env.GCS_BUCKET_NAME);
		this.allowedTypes = [
			'image/jpeg',
			'image/png',
			'image/gif',
			'video/mp4',
			'video/quicktime',
		];
	}

	async uploadFile(file, folder = 'uploads', retries = 3) {
		// Validate file size
		if (file.size > (env.MAX_FILE_SIZE || 5 * 1024 * 1024)) {
			throw new CustomError(errorCode.FILE_TOO_LARGE);
		}

		// Validate file type
		if (!this.allowedTypes.includes(file.mimetype)) {
			throw new CustomError(errorCode.INVALID_FILE_TYPE);
		}

		let blob;
		for (let i = 0; i < retries; i++) {
			try {
				const fileExtension = file.originalname.split('.').pop();
				const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

				blob = this.bucket.file(fileName);
				const blobStream = blob.createWriteStream({
					resumable: false,
					metadata: {
						contentType: file.mimetype,
					},
				});

				return new Promise((resolve, reject) => {
					let uploadedBytes = 0;
					const totalBytes = file.size;

					blobStream.on('error', async (error) => {
						// Cleanup on error
						if (blob) {
							await blob.delete().catch(() => {});
						}
						reject(new CustomError(errorCode.FILE_UPLOAD_FAILED));
					});

					blobStream.on('progress', (progress) => {
						uploadedBytes = progress;
						const percentage = Math.round((uploadedBytes / totalBytes) * 100);
						console.log(`Upload progress: ${percentage}%`);
					});

					blobStream.on('finish', async () => {
						try {
							// Make the file public
							await blob.makePublic();
							const publicUrl = `https://storage.googleapis.com/${env.GCS_BUCKET_NAME}/${fileName}`;
							resolve(publicUrl);
						} catch (error) {
							// Cleanup if making public fails
							if (blob) {
								await blob.delete().catch(() => {});
							}
							reject(new CustomError(errorCode.FILE_UPLOAD_FAILED));
						}
					});

					blobStream.end(file.buffer);
				});
			} catch (error) {
				// Cleanup on error
				if (blob) {
					await blob.delete().catch(() => {});
				}

				if (i === retries - 1) {
					throw new CustomError(errorCode.FILE_UPLOAD_FAILED);
				}

				// Exponential backoff
				await new Promise((resolve) => setTimeout(resolve, 1000 * Math.pow(2, i)));
			}
		}
	}

	async uploadFiles(files, folder = 'uploads', retries = 3) {
		const uploadPromises = files.map((file) =>
			this.uploadFile(file, folder, retries)
		);
		try {
			const urls = await Promise.all(uploadPromises);
			return urls;
		} catch (error) {
			throw new CustomError(errorCode.FILE_UPLOAD_FAILED);
		}
	}

	async deleteFile(fileUrl) {
		try {
			const fileName = fileUrl.split(`${env.GCS_BUCKET_NAME}/`)[1];
			if (!fileName) {
				throw new CustomError(errorCode.FILE_DELETE_FAILED);
			}

			await this.bucket.file(fileName).delete();
			return true;
		} catch (error) {
			throw new CustomError(errorCode.FILE_DELETE_FAILED);
		}
	}

	async deleteFiles(fileUrls) {
		try {
			const deletePromises = fileUrls.map((url) => this.deleteFile(url));
			await Promise.all(deletePromises);
			return true;
		} catch (error) {
			throw new CustomError(errorCode.FILE_DELETE_FAILED);
		}
	}
}

export default GCSStorageProvider;
