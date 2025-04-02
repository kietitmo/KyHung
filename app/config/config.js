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

	static get EMAIL_REGEXP() {
		return new RegExp(process.env.EMAIL_REGEXP);
	}

	static get PASSWORD_REGEXP() {
		return new RegExp(process.env.PASSWORD_REGEXP);
	}

	static get PASSWORD_MIN_LENGTH() {
		return new RegExp(process.env.PASSWORD_MIN_LENGTH);
	}

	static get FULL_NAME_REGEXP() {
		return new RegExp(process.env.FULL_NAME_REGEXP);
	}

	static get URL_REGEXP() {
		return new RegExp(process.env.URL_REGEXP);
	}

	
	static get GOOGLE_CLIENT_ID() {
		return process.env.GOOGLE_CLIENT_ID;
	}

	static get GOOGLE_CLIENT_SECRET() {
		return process.env.GOOGLE_CLIENT_SECRET;
	}

	static get MAIL_SERVICE() {
		return process.env.MAIL_SERVICE;
	}

	static get MAIL_USER() {
		return process.env.MAIL_USER;
	}	

	static get MAIL_PASSWORD() {
		return process.env.MAIL_PASSWORD;
	}

	static get APP_HOST() {
		return process.env.APP_HOSTNAME;
	}
}

export default Config;
