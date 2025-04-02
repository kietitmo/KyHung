import EmailTemplate from './emailTemplate.js';

class ForgotPasswordTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ url, user }) {
		return `
            <h1>Password Reset Request</h1>
            <p>Hello ${user.fullName || user.email},</p>
            <p>We received a request to reset your password. Please click the button below to reset your password:</p>
            <a href="${url}" style="display: inline-block; background-color: #FF5733; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p>Or copy and paste the following link in your browser:</p>
            <p>${url}</p>
            <p>This link will expire in 30 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have any concerns.</p>
            <p>Thank you!</p>
        `;
	}
}

export default ForgotPasswordTemplate;
