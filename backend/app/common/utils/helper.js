import env from '../config/env.js';

export const handleAsync = async (req, res, next, callback) => {
	try {
		await callback();
	} catch (error) {
		next(error);
	}
};

export const getPaginationParams = (req) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || env.DEFAULT_PAGE_SIZE;
	const offset = (page - 1) * limit;

	return { page, limit, offset };
};

export const getSortParams = (req, defaultSort = { createdAt: -1 }) => {
	const sortQuery = req.query.sortBy;

	if (!sortQuery) {
		return defaultSort;
	}

	const sortFields = sortQuery.split(',');
	const sortParams = {};

	sortFields.forEach((field) => {
		const [key, order] = field.split(':');
		sortParams[key] = order?.toLowerCase() === 'asc' ? 1 : -1;
	});

	return Object.keys(sortParams).length > 0 ? sortParams : defaultSort;
};

export const getSearchQuery = (req, searchFields = []) => {
	const searchTerm = req.query.search;
	if (!searchTerm || searchFields.length === 0) return {};

	return {
		$or: searchFields.map((field) => ({
			[field]: { $regex: searchTerm, $options: 'i' },
		})),
	};
};

const controllerHelper = {
	getPaginationParams,
	getSortParams,
	getSearchQuery,
	handleAsync,
};

export default controllerHelper;
