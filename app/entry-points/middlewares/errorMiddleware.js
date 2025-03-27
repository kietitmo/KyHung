import CustomError from '../../domain/dto/customError.js';
import APIResponse from '../../domain/dto/apiResponse.js';

const errorHandler = (err, req, res, next) => {
	// Nếu lỗi là một CustomError
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json(
			APIResponse.fail(err.message, err.errorCode) // Sử dụng APIResponse.fail
		);
	}

	// Nếu không phải lỗi custom, trả về lỗi hệ thống
	return res.status(500).json(
		APIResponse.fail(500, 'Internal Server Error') // Sử dụng APIResponse.fail
	);
};

export default errorHandler;
