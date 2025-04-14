import bcrypt from 'bcryptjs';
import UserRepository from '../../../user/data-access/user.repository.js';
import dotenv from 'dotenv';
import { errorCode } from '../../common/constants/authResponseCode.js';
import CustomError from '../../../common/custom/error/customError.js';
import env from '../../../common/config/env.js';
import AuthHelper from '../../common/utils/authHelpper.js';
import sendEmail from '../../../common/mail-service/mailer.js';
import TokenRepository from '../../data-access/repositories/token.repository.js';
import EmailTemplateFactory from '../../../common/mail-service/email-templates/emailTemplateFactory.js';
import TokenType from '../../domain/models/tokenType.enum.js';

dotenv.config();

class AuthService {
	constructor() {
		this.userRepository = new UserRepository();
		this.tokenRepository = new TokenRepository();
	}

	async login(email, password) {
		const user = await this.userRepository.findOne({ email: email });

		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new CustomError(errorCode.INVALID_PASSWORD);
		}

		const payload = { email: user.email, role: user.role };
		const accessToken = await AuthHelper.generateAccessToken(payload);
		const refreshToken = await AuthHelper.generateRefreshToken(payload);

		return { accessToken, refreshToken, user };
	}

	async register(userData) {
		let user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			throw new CustomError(errorCode.USER_ALREADY_EXIST);
		}

		const token = await AuthHelper.generateVerificationToken();
		const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const tokenData = {
			tokenValue: token,
			email: userData.email,
			expiresAt: verificationTokenExpires,
			type: TokenType.VERIFICATION,
		};

		const tokenInstance = await this.tokenRepository.findOne({
			tokenValue: tokenData.tokenValue,
			type: TokenType.VERIFICATION,
		});
		if (tokenInstance) {
			throw new CustomError(errorCode.INVALID_TOKEN);
		}

		await this.tokenRepository.create(tokenData);
		user = await this.userRepository.create(userData);

		const verificationUrl = `http://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/verify-email/${token}`;
		const template = EmailTemplateFactory.getTemplate('register', {
			url: verificationUrl,
			user: user,
		});

		console.log('sent email, verification link: ', verificationUrl);
		console.log(template);

		sendEmail(user.email, 'Verify your email', template);

		return user;
	}

	static async refreshAccessToken(refreshToken) {
		try {
			const decoded = await AuthHelper.verifyRefreshToken(refreshToken);
			const newAccessToken = await AuthHelper.generateAccessToken({
				email: decoded.email,
				role: decoded.role,
			});

			return newAccessToken;
		} catch (err) {
			throw new CustomError(errorCode.INVALID_REFRESH_TOKEN);
		}
	}

	async verifyEmail(token) {
		const tokenInstance = await this.tokenRepository.findOne({
			tokenValue: token,
			type: TokenType.VERIFICATION,
		});

		if (!tokenInstance) {
			throw new CustomError(errorCode.INVALID_TOKEN);
		}

		if (tokenInstance.expiresAt < new Date()) {
			throw new CustomError(errorCode.TOKEN_EXPIRED);
		}

		const user = await this.userRepository.findOne({
			email: tokenInstance.email,
		});
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		await this.userRepository.update({ email: user.email }, { isVerified: true });
		await this.tokenRepository.delete({ _id: tokenInstance._id });

		return user;
	}

	async resendToken(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		if (user.isVerified) {
			throw new CustomError(errorCode.USER_ALREADY_VERIFIED);
		}

		const token = await AuthHelper.generateVerificationToken();
		const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const tokenData = {
			tokenValue: token,
			email: email,
			expiresAt: verificationTokenExpires,
			type: TokenType.VERIFICATION,
		};

		await this.tokenRepository.create(tokenData);

		const verificationUrl = `http://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/verify-email/${token}`;
		const template = EmailTemplateFactory.getTemplate('register', {
			url: verificationUrl,
			user: user,
		});

		sendEmail(email, 'Verify your email', template);

		return user;
	}

	async forgotPassword(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		const token = await AuthHelper.generateVerificationToken();
		const resetTokenExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour

		const tokenData = {
			tokenValue: token,
			email: email,
			expiresAt: resetTokenExpires,
			type: TokenType.PASSWORD_RESET,
		};

		await this.tokenRepository.create(tokenData);

		const resetUrl = `http://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/reset-password/${token}`;
		const template = EmailTemplateFactory.getTemplate('forgotPassword', {
			url: resetUrl,
			user: user,
		});

		sendEmail(email, 'Reset your password', template);

		return user;
	}

	async resetPassword(token, newPassword) {
		const tokenInstance = await this.tokenRepository.findOne({
			tokenValue: token,
			type: TokenType.PASSWORD_RESET,
		});

		if (!tokenInstance) {
			throw new CustomError(errorCode.INVALID_TOKEN);
		}

		if (tokenInstance.expiresAt < new Date()) {
			throw new CustomError(errorCode.TOKEN_EXPIRED);
		}

		const user = await this.userRepository.findOne({
			email: tokenInstance.email,
		});
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		await this.userRepository.update(
			{ email: user.email },
			{ password: newPassword }
		);
		await this.tokenRepository.delete({ _id: tokenInstance._id });

		return user;
	}

	async invalidateRefreshToken(userId) {
		// Implement token invalidation logic here
		return true;
	}

	async resetPasswordToDefault(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		await this.userRepository.update(
			{ email },
			{ password: env.DEFAULT_PASSWORD }
		);

		return user;
	}

	async getProfile(email) {
		const user = await this.userRepository.findOne({ email });

		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		return user;
	}

	async verifyAccount(email) {
		const user = await this.userRepository.findOne({ email });
		if (!user) {
			throw new CustomError(errorCode.USER_NOT_EXIST);
		}

		await this.userRepository.update({ email }, { isVerified: true });

		return user;
	}
}

export default AuthService;
