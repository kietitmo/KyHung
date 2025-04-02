import { createTransport } from 'nodemailer';
import Config from '../config/config.js';

const transporter = createTransport({
    host: 'smtp.gmail.com', 
    auth: {
        user: Config.MAIL_USER,
        pass: Config.MAIL_PASSWORD
    },
    secure: false, 
    port: 587,  
    tls: {
        rejectUnauthorized: false,  
    }
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: Config.MAIL_USER,
        to,
        subject,
        text,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log('Error occurred: ', error);
        return;
        }
        console.log('Email sent: ' + info.response);
    });
};

export default sendEmail;
