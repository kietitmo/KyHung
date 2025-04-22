import fs from 'fs/promises';
import path from 'path';
import CustomError from '../../../custom/error/customError.js';
import { errorCode } from '../fileResponseCode.js';
import IStorageProvider from './IStorageProvider.js';

class LocalStorageProvider extends IStorageProvider {
	constructor() {
		super();
	}

	async uploadFile(file, directory) {
		try {
			const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.originalname.split('.').pop()}`;
			const fullDir = path.resolve(directory);
			await fs.mkdir(fullDir, { recursive: true });

			const filepath = path.join(fullDir, filename);
			await fs.writeFile(filepath, file.buffer);

			const publicPath = path.join(directory, filename);
			return publicPath;
		} catch (error) {
			throw new CustomError(errorCode.FILE_UPLOAD_FAILED);
		}
	}

	async deleteFile(filepath) {
		try {
			const absolutePath = path.resolve(filepath);
			const parentDir = path.dirname(absolutePath);
			await fs.rm(parentDir, { recursive: true, force: true });
			return true;
		} catch (error) {
			throw new CustomError(errorCode.FILE_DELETE_FAILED);
		}
	}
}

export default LocalStorageProvider;
