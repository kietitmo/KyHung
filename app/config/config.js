import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(new URL(import.meta.url).pathname, '../../.env');
dotenv.config({ path: envPath });

class Config {
	static get PORT() {
		return process.env.PORT;
	}

	static get MONGODB_URI() {
		return process.env.MONGODB_URI;
	}

	static get JWT_SECRET() {
		return process.env.JWT_SECRET;
	}

	static get JWT_SECRET_EXPIRE_TIME() {
		return process.env.JWT_SECRET_EXPIRE_TIME;
	}

	static get JWT_REFRESH_SECRET() {
		return process.env.JWT_REFRESH_SECRET;
	}

	static get JWT_REFRESH_SECRET_EXPIRE_TIME() {
		return process.env.JWT_REFRESH_SECRET_EXPIRE_TIME;
	}

	static get SALT_JWT() {
		return process.env.SALT_JWT;
	}
}

export default Config;
