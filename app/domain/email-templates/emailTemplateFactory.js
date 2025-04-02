import RegisterVerificationTemplate from './registerVerificationTemplate.js';
import ForgotPasswordTemplate from './forgotPasswordTemplate.js';
import CustomError from '../custom/customError.js';
import { errorCode } from '../../utils/code/authResponseCode.js';

class EmailTemplateFactory {
	static getTemplate(type, data) {
		switch (type) {
			case 'register':
				return new RegisterVerificationTemplate().generate(data);
			case 'forgotPassword':
				return new ForgotPasswordTemplate().generate(data);
			default:
				throw new CustomError(errorCode.INVALID_EMAIL_TEMPLATE);
		}
	}
}

export default EmailTemplateFactory;
