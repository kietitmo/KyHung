import bcrypt from 'bcryptjs';
import Constants from '../config/config.js';
import jwt from 'jsonwebtoken';
import crypto from 'crypto'
import Config from '../config/config.js';
class AuthHelper {
	static async hashPassword(password) {
		const salt = bcrypt.genSalt(Constants.SALT_JWT);

		const hashedPassword = bcrypt.hash(password, salt);
		return hashedPassword;
	}

	static async generateAccessToken(payload) {
		return jwt.sign(payload, Config.JWT_SECRET, {
			expiresIn: Config.JWT_SECRET_EXPIRE_TIME,
		});
	}

	static async generateRefreshToken(payload) {
		return jwt.sign(payload, Config.JWT_REFRESH_SECRET, {
			expiresIn: Config.JWT_REFRESH_SECRET_EXPIRE_TIME,
		});
	}

	static async verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, Config.JWT_REFRESH_SECRET);
	}

	static async generateVerificationToken() {
		return crypto.randomBytes(32).toString('hex');
	};
}

export default AuthHelper;
