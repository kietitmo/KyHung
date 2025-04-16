import EmailTemplate from './emailTemplate.js';
import env from '../../../config/env.js';

class PasswordResetConfirmationTemplate extends EmailTemplate {
	constructor() {
		super();
	}

	generate({ user }) {
		// Construct login URL using environment variables
		const loginUrl = `${env.APP_PROTOCOL || 'http'}://${env.APP_HOSTNAME || 'localhost:5001'}/login`;

		const content = `
			<h1 class="title">Password Reset Successful</h1>
			<div class="text">
				<p>Hello ${user.fullName || user.email},</p>
				<p>Your password has been successfully reset. Here are some important security tips:</p>
				<ul style="color: #666666; margin: 10px 0;">
					<li>Use a strong, unique password</li>
					<li>Never share your password with anyone</li>
					<li>Enable two-factor authentication if available</li>
					<li>Regularly update your password</li>
				</ul>
			</div>
			<div class="text">
				<p>If you did not make this change, please contact our support team immediately.</p>
				<p>For your security, we recommend reviewing your recent account activity.</p>
			</div>
			<div style="text-align: center; margin-top: 30px;">
				<a href="${loginUrl}" class="button">Login to Your Account</a>
			</div>
		`;
		return super.generate(content);
	}
}

export default PasswordResetConfirmationTemplate;
