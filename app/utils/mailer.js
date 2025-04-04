import { createTransport } from 'nodemailer';
import env from '../config/env.js';
import { CustomError } from '../domain/custom/index.js';

const transporter = createTransport({
    host: env.EMAIL_HOST,
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    },
    secure: false, 
    port: env.EMAIL_PORT,  
    tls: {
        rejectUnauthorized: false,  
    }
});

/**
 * Send an email
 * @param {string} to - Recipient email address
 * @param {string} subject - Email subject
 * @param {string} text - Email text content
 * @param {string} html - Email HTML content (optional)
 * @returns {Promise} - Resolves when email is sent, rejects with error
 */
const sendEmail = (to, subject, text, html = null) => {
    const mailOptions = {
        from: env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email error:', error);
                reject(new CustomError({
                    message: 'Failed to send email',
                    httpStatusCode: 500,
                    code: 'EMAIL_SEND_ERROR'
                }));
                return;
            }
            console.log('Email sent:', info.response);
            resolve(info);
        });
    });
};

export default sendEmail;
