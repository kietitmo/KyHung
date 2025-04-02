import EmailTemplate from './emailTemplate.js';

class RegisterVerificationTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ url, user }) {
		return `
            <h1>Email Verification</h1>
            <p>Hello ${user.fullName || user.email},</p>
            <p>Thank you for registering. Please verify your email by clicking the button below:</p>
            <a href="${url}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Verify Email</a>
            <p>Or copy and paste the following link in your browser:</p>
            <p>${url}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't register for an account, please ignore this email.</p>
        `;
	}
}

export default RegisterVerificationTemplate;
