import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../../data-access/repositories/userRepository.js';
import dotenv from 'dotenv';
import { errorCode } from '../../utils/userResponseCode.js';
import CustomError from '../custom/customError.js';
import Config from '../../config/config.js';
dotenv.config();

class AuthService {
	constructor() {
		this.userRepository = new UserRepository();
	}

	async login(email, password) {
		const user = await this.userRepository.findOne({ email: email });

		if (!user) {
			throw new CustomError(errorCode.USER_NOT_FOUND);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new CustomError(errorCode.INVALID_PASSWORD);
		}

		const payload = { email: user.email, role: user.role };
		const accessToken = jwt.sign(payload, Config.JWT_SECRET, {
			expiresIn: Config.JWT_SECRET_EXPIRE_TIME,
		});

		const refreshToken = jwt.sign(payload, Config.JWT_REFRESH_SECRET, {
			expiresIn: Config.JWT_REFRESH_SECRET_EXPIRE_TIME,
		});

		return { accessToken, refreshToken };
	}

	static async refreshAccessToken(refreshToken) {
		try {
			const decoded = jwt.verify(refreshToken, Config.JWT_REFRESH_SECRET);
			const newAccessToken = jwt.sign(
				{ email: decoded.email, role: decoded.role },
				Config.JWT_SECRET,
				{ expiresIn: Config.JWT_SECRET_EXPIRE_TIME }
			);

			return newAccessToken;
		} catch (err) {
			throw new CustomError(errorCode.INVALID_REFRESH_TOKEN);
		}
	}
}

export default AuthService;
