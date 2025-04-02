import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../../data-access/repositories/userRepository.js';
import dotenv from 'dotenv';
import { errorCode as userCode } from '../../utils/userResponseCode.js';
import { errorCode as authCode } from '../../utils/authResponseCode.js';

import CustomError from '../custom/customError.js';
import Config from '../../config/config.js';
import AuthHelper from '../../utils/authHelpper.js'
import sendEmail from '../../utils/mailer.js'
import TokenRepository from '../../data-access/repositories/tokenRepository.js';
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
		const accessToken = await AuthHelper.generateAccessToken(payload)
		const refreshToken = await AuthHelper.generateRefreshToken(payload)

		return { accessToken, refreshToken };
	}

	async register(userData) {
		let user = await this.userRepository.findOne({ email: userData.email });
		if (user) {
			throw new CustomError(userCode.USER_EXISTS);
		}

		const token = await AuthHelper.generateVerificationToken()
		const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

		const tokenData = {
			tokenValue: token,
			email: userData.email,
			expiresAt: verificationTokenExpires
		}

		const tokenInstance = await this.tokenRepository.findOne({ tokenValue: tokenData.tokenValue });
		if (tokenInstance) {
			throw new CustomError(authCode.INVALID_TOKEN);
		}

		await this.tokenRepository.create(tokenData);
		user = await this.userRepository.create(userData);
		this.sendVerificationEmail(user, token)

		return user
	}

	static async refreshAccessToken(refreshToken) {
		try {
			const decoded = await AuthHelper.verifyRefreshToken(refreshToken)
			const newAccessToken = await AuthHelper.generateAccessToken({ email: decoded.email, role: decoded.role })

			return newAccessToken;
		} catch (err) {
			throw new CustomError(authCode.INVALID_REFRESH_TOKEN);
		}
	}

	async sendVerificationEmail (user, token) {
		const verificationUrl = `http://${Config.APP_HOSTNAME || 'localhost:5000'}/api/auth/verify-email/${token}`;
		const to = user.email;
		const subject= 'Email Verification';
		const html= `
			<h1>Email Verification</h1>
			<p>Hello ${user.fullName || user.email},</p>
			<p>Thank you for registering. Please verify your email by clicking the button below:</p>
			<a href="${verificationUrl}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
			<p>Or copy and paste the following link in your browser:</p>
			<p>${verificationUrl}</p>
			<p>This link will expire in 24 hours.</p>
			<p>If you didn't register for an account, please ignore this email.</p>
		`
		// suppose sent email
		console.log("Suppose sent email, verification link: ", verificationUrl)
		// sendEmail(to, subject, html);
	};

	async verifyEmail(token) {
		const tokenInstance = await this.tokenRepository.findOne({ tokenValue: token });
		if (!tokenInstance) {
			throw new CustomError(authCode.VERIFY_TOKEN_NOT_FOUND);
		}
					
		if (tokenInstance.expiresAt < Date.now()) {
			throw new CustomError(authCode.VERIFY_TOKEN_EXPIRED);
		}
	
		const user = await this.userRepository.findOne({ email:tokenInstance.email });
		
		if (!user) {
			throw new CustomError(userCode.USER_NOT_FOUND);
		}
		
		user.isVerified = true;
		const updatedUser = await this.userRepository.update({email: user.email}, user);
		
		this.tokenRepository.delete({ tokenValue: token });
		return updatedUser
	}
}

export default AuthService;
