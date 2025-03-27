class APIResponse {
	constructor(status, code, message = null, data = null) {
		this.status = status;
		this.code = code;
		this.message = message;
		this.data = data;
	}

	static success(code = 200, message = null, data = null) {
		return new APIResponse('success', code, message, data);
	}

	static fail(code = 400, message = 'An error occurred', data = null) {
		return new APIResponse('fail', code, message);
	}
}

export default APIResponse;
