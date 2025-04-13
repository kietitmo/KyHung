import { APP_STATUS } from '../constants/index.js';

class APIResponse {
	constructor(status, message = null, data = null) {
		this.status = status;
		this.message = message;
		this.data = data;
	}

	static success(message = 'Request successful', data = null) {
		return new APIResponse(APP_STATUS.SUCCESS, message, data);
	}

	static fail(message = 'An error occurred', data = null) {
		return new APIResponse(APP_STATUS.FAIL, message, data);
	}
}

export default APIResponse;
