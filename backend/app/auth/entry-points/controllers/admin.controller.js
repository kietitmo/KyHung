import { successCode } from '../../common/constants/authResponseCode.js';
import AuthService from '../../domain/services/auth.service.js';
import { handleAsync } from '../../../common/utils/helper.js';
import APIResponse from '../../../common/custom/apiResponse.js';

class AdminController {
	constructor() {
		this.authService = new AuthService();
	}

	async resetPasswordToDefault(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.body.email;

			await this.authService.resetPasswordToDefault(email);

			const response = APIResponse.success(
				successCode.PASSWORD_RESET_SUCCESS.message,
				null
			);

			res.status(successCode.PASSWORD_RESET_SUCCESS.httpStatusCode).json(response);
		});
	}

	async verifyAccount(req, res, next) {
		await handleAsync(req, res, next, async () => {
			const email = req.body.email;

			await this.authService.verifyAccount(email);

			const response = APIResponse.success(
				successCode.ACCOUNT_VERIFIED.message,
				null
			);

			res.status(successCode.ACCOUNT_VERIFIED.httpStatusCode).json(response);
		});
	}
}

export default AdminController;
