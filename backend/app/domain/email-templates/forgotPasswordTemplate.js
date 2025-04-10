import EmailTemplate from './emailTemplate.js';
import env from '../../config/env.js';

class ForgotPasswordTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ token, user }) {
		// Construct reset URL using environment variables
		const resetUrl = `${env.APP_PROTOCOL || 'http'}://${env.APP_HOSTNAME || 'localhost:5001'}/reset-password?token=${token}`;

		const content = `
            <h1 class="title">Password Reset Request</h1>
            <div class="text">
                <p>Hello ${user.fullName || user.email},</p>
                <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
                <p>To reset your password, click the button below:</p>
            </div>
            <div style="text-align: center;">
                <a href="${resetUrl}" class="button">Reset Password</a>
            </div>
            <div class="text">
                <p>Or copy and paste this link into your browser:</p>
                <p style="word-break: break-all; color: #4CAF50;">${resetUrl}</p>
                <p><strong>Important:</strong></p>
                <ul style="color: #666666; margin: 10px 0;">
                    <li>This link will expire in ${env.PASSWORD_RESET_EXPIRY || '30'} minutes</li>
                    <li>For security reasons, please change your password immediately</li>
                    <li>If you didn't request this reset, please contact our support team</li>
                </ul>
            </div>
        `;
		return super.generate(content);
	}
}

export default ForgotPasswordTemplate;
