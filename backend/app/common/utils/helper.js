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

export const getFilterQuery = (req) => {
	const filterStr = req.query.filter;
	if (!filterStr) return {};

	const operatorsMap = {
		eq: (field, value) => ({ [field]: value }),
		gt: (field, value) => ({ [field]: { $gt: parseFloat(value) } }),
		gte: (field, value) => ({ [field]: { $gte: parseFloat(value) } }),
		lt: (field, value) => ({ [field]: { $lt: parseFloat(value) } }),
		lte: (field, value) => ({ [field]: { $lte: parseFloat(value) } }),
		ne: (field, value) => ({ [field]: { $ne: value } }),
		in: (field, value) => ({ [field]: { $in: value.split('|') } }),
		like: (field, value) => ({
			[field]: { $regex: value, $options: 'i' },
		}),
	};

	const filter = {};

	const filters = filterStr.split(',');

	for (const f of filters) {
		const [field, operator, value] = f.split(':');
		if (!field || !operator || value === undefined) continue;

		const handler = operatorsMap[operator];
		if (!handler) continue;

		Object.assign(filter, handler(field, value));
	}

	return filter;
};

const controllerHelper = {
	getPaginationParams,
	getSortParams,
	getFilterQuery,
	handleAsync,
};

export default controllerHelper;
