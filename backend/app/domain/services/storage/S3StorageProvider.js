import {
	S3Client,
	PutObjectCommand,
	DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import CustomError from '../../custom/customError.js';
import { errorCode } from '../../../utils/code/fileResponseCode.js';
import env from '../../../config/env.js';
import IStorageProvider from './IStorageProvider.js';

class S3StorageProvider extends IStorageProvider {
	constructor() {
		super();
		this.s3Client = new S3Client({
			region: env.AWS_REGION,
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
			},
		});
		this.bucketName = env.AWS_BUCKET_NAME;
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

		for (let i = 0; i < retries; i++) {
			try {
				const fileExtension = file.originalname.split('.').pop();
				const key = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

				const command = new PutObjectCommand({
					Bucket: this.bucketName,
					Key: key,
					Body: file.buffer,
					ContentType: file.mimetype,
					ACL: 'public-read',
				});

				await this.s3Client.send(command);
				return `https://${this.bucketName}.s3.${env.AWS_REGION}.amazonaws.com/${key}`;
			} catch (error) {
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
			const key = fileUrl.split(
				`${this.bucketName}.s3.${env.AWS_REGION}.amazonaws.com/`
			)[1];
			if (!key) {
				throw new CustomError(errorCode.FILE_DELETE_FAILED);
			}

			const command = new DeleteObjectCommand({
				Bucket: this.bucketName,
				Key: key,
			});

			await this.s3Client.send(command);
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

export default S3StorageProvider;
