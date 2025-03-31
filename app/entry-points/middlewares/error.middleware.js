import {CustomError, APIResponse} from '../../domain/custom/index.js';

const errorHandler = (err, req, res, next) => {
	console.error(err);
	if (err instanceof CustomError) {
		return res.status(err.httpStatusCode).json(
			APIResponse.fail(err.code, err.message) 
		);
	}

	return res.status(500).json(
		APIResponse.fail(500, 'Internal Server Error') 
	);
};

export default errorHandler;
