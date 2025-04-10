import { CustomError, APIResponse } from '../../domain/custom/index.js';
import mongoose from 'mongoose';
import pkg from 'joi';
const { ValidationError } = pkg;

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
	console.error('Error:', err);
	
	// Handle custom application errors
	if (err instanceof CustomError) {
		return res
			.status(err.httpStatusCode)
			.json(APIResponse.fail(err.code, err.message));
	}
	
	// Handle Joi validation errors
	if (err instanceof ValidationError) {
		return res
			.status(400)
			.json(APIResponse.fail(400, 'Validation Error', err.details));
	}
	
	// Handle Mongoose validation errors
	if (err instanceof mongoose.Error.ValidationError) {
		const errors = Object.values(err.errors).map(error => ({
			field: error.path,
			message: error.message
		}));
		
		return res
			.status(400)
			.json(APIResponse.fail(400, 'Validation Error', errors));
	}
	
	// Handle Mongoose duplicate key errors
	if (err.code === 11000) {
		const field = Object.keys(err.keyPattern)[0];
		return res
			.status(409)
			.json(APIResponse.fail(409, `${field} already exists`));
	}
	
	// Handle JWT errors
	if (err.name === 'JsonWebTokenError') {
		return res
			.status(401)
			.json(APIResponse.fail(401, 'Invalid token'));
	}
	
	if (err.name === 'TokenExpiredError') {
		return res
			.status(401)
			.json(APIResponse.fail(401, 'Token expired'));
	}
	
	// Default error
	return res.status(500).json(APIResponse.fail(500, 'Internal Server Error'));
};

export default errorHandler;
