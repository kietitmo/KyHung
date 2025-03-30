// include hepler for authen like
// hash password
// compare password
// generate token

import bcrypt from 'bcryptjs';
import Constants from '../config/config.js';
class AuthHelper {
	static async hashPassword(password) {
		const salt = bcrypt.genSalt(Constants.SALT_JWT);

		const hashedPassword = bcrypt.hash(password, salt);
		return hashedPassword;
	}
}

export default AuthHelper;
