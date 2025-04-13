import RegisterVerificationTemplate from '../templates/registerVerificationTemplate.js';
import ForgotPasswordTemplate from '../templates/forgotPasswordTemplate.js';
import PasswordResetConfirmationTemplate from '../templates/passwordResetConfirmationTemplate.js';
import CustomError from '../../custom/error/customError.js';
import { errorCode } from '../constants/mailResponseCode.js';

class EmailTemplateFactory {
	static getTemplate(type, data) {
		switch (type) {
			case 'register':
				return new RegisterVerificationTemplate().generate(data);
			case 'forgotPassword':
				return new ForgotPasswordTemplate().generate(data);
			case 'passwordResetConfirmation':
				return new PasswordResetConfirmationTemplate().generate(data);
			default:
				throw new CustomError(errorCode.INVALID_EMAIL_TEMPLATE);
		}
	}
}

export default EmailTemplateFactory;
