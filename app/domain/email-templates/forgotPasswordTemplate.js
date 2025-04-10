import EmailTemplate from './emailTemplate.js';

class ForgotPasswordTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ token, user }) {
		return `
            <h1>Password Reset Request</h1>
            <p>Hello ${user.fullName || user.email},</p>
            <p>We received a request to reset your password. This is token to reset your password:</p>
            <p style="display: inline-block; background-color:rgb(0, 223, 11); color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">${token}</p>
            <p>This token will expire in 30 minutes.</p>
            <p>If you didn't request a password reset, please ignore this email or contact support if you have any concerns.</p>
            <p>Thank you!</p>
        `;
	}
}

export default ForgotPasswordTemplate;
