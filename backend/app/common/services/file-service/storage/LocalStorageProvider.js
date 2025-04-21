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
			await fs.mkdir(directory, { recursive: true });

			const fileExtension = file.originalname.split('.').pop();
			const filename = `${directory}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

			const filepath = path.join(directory, filename);

			await fs.writeFile(filepath, file.buffer);

			return filepath;
		} catch (error) {
			throw new CustomError(errorCode.FILE_UPLOAD_FAILED);
		}
	}

	async deleteFile(filepath) {
		try {
			await fs.unlink(filepath);
			return true;
		} catch (error) {
			throw new CustomError(errorCode.FILE_DELETE_FAILED);
		}
	}
}

export default LocalStorageProvider;
