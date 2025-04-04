import bcrypt from 'bcryptjs';
import UserRepository from '../../data-access/repositories/userRepository.js';
import dotenv from 'dotenv';
import { errorCode as userCode } from '../../utils/code/userResponseCode.js';
import { errorCode as authCode } from '../../utils/code/authResponseCode.js';

import CustomError from '../custom/customError.js';
import env from '../../config/env.js';
import AuthHelper from '../../utils/authHelpper.js';
import sendEmail from '../../utils/mailer.js';
import TokenRepository from '../../data-access/repositories/tokenRepository.js';
import EmailTemplateFactory from '../email-templates/emailTemplateFactory.js';
import TokenType from '../models/tokenType.enum.js';

dotenv.config();

class AuthService {
	constructor() {
		this.userRepository = new UserRepository();
		this.tokenRepository = new TokenRepository();
	}

	async login(email, password) {
		const user = await this.userRepository.findOne({ email: email });

		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new CustomError(userCode.INVALID_PASSWORD);
		}

		const payload = { email: user.email, role: user.role };
		const accessToken = await AuthHelper.generateAccessToken(payload);
		const refreshToken = await AuthHelper.generateRefreshToken(payload);

		return { accessToken, refreshToken };
	}

	async register(userData) {
		let user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			throw new CustomError(userCode.USER_EXISTS);
		}

		const token = await AuthHelper.generateVerificationToken();
		const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const tokenData = {
			tokenValue: token,
			email: userData.email,
			expiresAt: verificationTokenExpires,
			type: TokenType.VERIFICATION
		};

		const tokenInstance = await this.tokenRepository.findOne({
			tokenValue: tokenData.tokenValue,
			type: TokenType.VERIFICATION
		});
		if (tokenInstance) {
			throw new CustomError(authCode.INVALID_TOKEN);
		}

		await this.tokenRepository.create(tokenData);
		user = await this.userRepository.create(userData);

		const verificationUrl = `http://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/verify-email/${token}`;
		const template = EmailTemplateFactory.getTemplate('register', {
			url: verificationUrl,
			user: user,
		});

		console.log('Suppose sent email, verification link: ', verificationUrl);
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
			throw new CustomError(authCode.INVALID_REFRESH_TOKEN);
		}
	}

	async verifyEmail(token) {
		const tokenInstance = await this.tokenRepository.findOne({
			tokenValue: token,
			type: TokenType.VERIFICATION
		});

		if (!tokenInstance) {
			throw new CustomError(authCode.VERIFY_TOKEN_NOT_FOUND);
		}

		if (tokenInstance.expiresAt < Date.now()) {
			throw new CustomError(authCode.VERIFY_TOKEN_EXPIRED);
		}

		const user = await this.userRepository.findOne({
			email: tokenInstance.email,
		});

		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		user.isVerified = true;
		const updatedUser = await this.userRepository.update(
			{ email: user.email },
			user
		);

		this.tokenRepository.deleteMany({ email: tokenInstance.email });
		return updatedUser;
	}

	async resendToken(email) {
		let token = await this.tokenRepository.findOne({ email: email });
		if (!token) {
			throw new CustomError(authCode.USER_ALREADY_VERIFIED);
		}

		const user = this.userRepository.findOne({ email: email });
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const newToken = await AuthHelper.generateVerificationToken();
		const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const tokenData = {
			tokenValue: newToken,
			email: email,
			expiresAt: verificationTokenExpires,
			type: TokenType.VERIFICATION
		};

		await this.tokenRepository.create(tokenData);

		const verificationUrl = `http://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/verify-email/${newToken}`;
		const template = EmailTemplateFactory.getTemplate('register', {
			url: verificationUrl,
			user: user,
		});

		console.log('Suppose sent email, verification link: ', verificationUrl);
		console.log(template);

		sendEmail(user.email, 'Verify your email', template);

		return user;
	}

	async forgotPassword(email) {
		const user = await this.userRepository.findOne({ email: email });
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		const newToken = await AuthHelper.generateVerificationToken();
		const verificationTokenExpires = new Date(Date.now() + 60 * 30 * 1000); // 30 minutes

		const tokenData = {
			tokenValue: newToken,
			email: email,
			expiresAt: verificationTokenExpires,
			type: TokenType.FORGOT_PASSWORD
		};

		// Delete any existing password reset tokens for this user
		await this.tokenRepository.deleteMany({ email, type: TokenType.FORGOT_PASSWORD });

		await this.tokenRepository.create(tokenData);


		const template = EmailTemplateFactory.getTemplate('forgotPassword', {
			token: newToken,
			user: user,
		});

		console.log('Suppose sent email');
		console.log(template);

		sendEmail(user.email, 'Reset your password', template);

		return user;
	}

	async resetPassword(token, newPassword) {
		const tokenInstance = await this.tokenRepository.findOne({ 
			tokenValue: token,
			type: TokenType.FORGOT_PASSWORD
		});

		if (!tokenInstance) {
			throw new CustomError(authCode.PASSWORD_RESET_TOKEN_INVALID);
		}

		if (tokenInstance.expiresAt < Date.now()) {
			throw new CustomError(authCode.PASSWORD_RESET_TOKEN_EXPIRED);
		}

		const user = await this.userRepository.findOne({ email: tokenInstance.email });
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}

		// Hash the new password
		const hashedPassword = await AuthHelper.hashPassword(newPassword);
		
		// Update the user's password
		user.password = hashedPassword;
		await this.userRepository.update({ email: user.email }, user);

		// Delete the used token
		await this.tokenRepository.deleteMany({ tokenValue: token });

		// Send confirmation email
		const template = EmailTemplateFactory.getTemplate('passwordResetConfirmation', {
			user: user,
		});

		console.log('Sending password reset confirmation email');
		console.log(template);

		sendEmail(user.email, 'Password Reset Successful', template);

		return true;
	}

	async invalidateRefreshToken(userId) {
		// If you're storing refresh tokens in a database, implement this method
		// to invalidate all refresh tokens for a user
		// For example:
		// await this.refreshTokenRepository.delete({ userId });
		return true;
	}
}

export default AuthService;
