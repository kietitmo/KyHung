class CustomError extends Error {
	constructor(error, customMessage = null) {
		if (!error) {
			throw new Error('Invalid error key');
		}

		super(customMessage || error.message);

		this.message = customMessage || error.message;
		this.httpStatusCode = error.httpStatusCode || 500;
		this.code = error.code || 'UNKNOWN_ERROR';

		this.isOperational = true;
		Error.captureStackTrace(this, this.constructor);
	}
}

export default CustomError;
