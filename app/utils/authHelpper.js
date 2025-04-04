import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import env from '../config/env.js';

class AuthHelper {
	static async hashPassword(password) {
		const salt = await bcrypt.genSalt(env.SALT_JWT);

		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}

	static async generateAccessToken(payload) {
		return jwt.sign(payload, env.JWT_SECRET, {
			expiresIn: env.JWT_SECRET_EXPIRE_TIME,
		});
	}

	static async generateRefreshToken(payload) {
		return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
			expiresIn: env.JWT_REFRESH_SECRET_EXPIRE_TIME,
		});
	}

	static async verifyRefreshToken(refreshToken) {
		return jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);
	}

	static async generateVerificationToken() {
		return crypto.randomBytes(32).toString('hex');
	};
}

export default AuthHelper;
