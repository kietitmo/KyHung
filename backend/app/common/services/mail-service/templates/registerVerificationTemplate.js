import EmailTemplate from './emailTemplate.js';
import env from '../../../config/env.js';

class RegisterVerificationTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ url, user }) {
		// Use the provided URL or construct one using environment variables
		const verificationUrl =
			url ||
			`${env.APP_PROTOCOL || 'http'}://${env.APP_HOSTNAME || 'localhost:5001'}/api/auth/verify-email/${url}`;

		const content = `
            <h1 class="title">Welcome to ${env.EMAIL_COMPANY_NAME || 'Our Platform'}!</h1>
            <div class="text">
                <p>Hello ${user.fullName || user.email},</p>
                <p>Thank you for registering with us. We're excited to have you on board!</p>
                <p>To complete your registration and verify your email address, please click the button below:</p>
            </div>
            <div style="text-align: center;">
                <a href="${verificationUrl}" class="button">Verify Email Address</a>
            </div>
            <div class="text">
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
                <p><strong>Note:</strong> This verification link will expire in ${env.EMAIL_VERIFICATION_EXPIRY || '24'} hours for security reasons.</p>
                <p>If you didn't create an account with us, please ignore this email.</p>
            </div>
        `;
		return super.generate(content);
	}
}

export default RegisterVerificationTemplate;
