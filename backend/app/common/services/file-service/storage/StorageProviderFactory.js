import S3StorageProvider from './S3StorageProvider.js';
import GCSStorageProvider from './GCSStorageProvider.js';
import LocalStorageProvider from './LocalStorageProvider.js';
import env from '../../../config/env.js';

class StorageProviderFactory {
	static createProvider() {
		switch (env.STORAGE_PROVIDER) {
			case 's3':
				return new S3StorageProvider();
			case 'gcs':
				return new GCSStorageProvider();
			case 'local':
				return new LocalStorageProvider();
			default:
				throw new Error(`Unsupported storage provider: ${env.STORAGE_PROVIDER}`);
		}
	}
}

export default StorageProviderFactory;
