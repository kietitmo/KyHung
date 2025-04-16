import { createTransport } from 'nodemailer';
import env from '../../config/env.js';
import { CustomError } from '../../custom/index.js';

const transporter = createTransport({
	host: env.EMAIL_HOST,
	auth: {
		user: env.EMAIL_USER,
		pass: env.EMAIL_PASS,
	},
	secure: false,
	port: env.EMAIL_PORT,
	tls: {
		rejectUnauthorized: false,
	},
});

const sendEmail = (to, subject, text, html = null) => {
	const mailOptions = {
		from: env.EMAIL_USER,
		to,
		subject,
		text,
		html,
	};

	return new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error('Email error:', error);
				reject(
					new CustomError({
						message: 'Failed to send email',
						httpStatusCode: 500,
						code: 'EMAIL_SEND_ERROR',
					})
				);
				return;
			}
			resolve(info);
		});
	});
};

export default sendEmail;
