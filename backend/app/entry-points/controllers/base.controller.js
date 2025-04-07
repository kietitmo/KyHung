import APIResponse from '../../domain/custom/apiResponse.js';
import env from '../../config/env.js';

class BaseController {
	// Send success response
	sendSuccess(res, code, message, data, httpStatusCode) {
		const response = APIResponse.success(code, message, data);
		return res.status(httpStatusCode).json(response);
	}

	// Send error response
	sendError(res, error) {
		const response = APIResponse.error(error.code, error.message);
		return res.status(error.httpStatusCode || 500).json(response);
	}

	// Handle async operations with error handling
	async handleAsync(req, res, next, operation) {
		try {
			await operation(req, res);
		} catch (error) {
			next(error);
		}
	}

	// Handle pagination
	getPaginationParams(req) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || env.DEFAULT_PAGE_SIZE;
		const skip = (page - 1) * limit;

		return { page, limit, skip };
	}

	// Handle sorting
	getSortParams(req) {
		const sortField = req.query.sortBy || 'createdAt';
		const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;

		return { [sortField]: sortOrder };
	}

	// Handle search query
	getSearchQuery(req, searchFields) {
		const searchTerm = req.query.search;
		if (!searchTerm) return {};

		return {
			$or: searchFields.map((field) => ({
				[field]: { $regex: searchTerm, $options: 'i' },
			})),
		};
	}
}

export default BaseController;
