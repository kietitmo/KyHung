import env from '../config/env.js';
import mongoose from 'mongoose';
import pluralize from 'pluralize';

export const handleAsync = async (req, res, next, callback) => {
	try {
		await callback();
	} catch (error) {
		next(error);
	}
};

const getCollectionName = (modelName) => {
	const model = mongoose.models[modelName];
	if (model && model.collection) {
		return model.collection.name;
	}
	return pluralize(modelName);
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

// export const getFilterQuery = (req) => {
// 	const filterStr = req.query.filter;
// 	if (!filterStr) return {};

// 	const operatorsMap = {
// 		eq: (field, value) => ({ [field]: value }),
// 		gt: (field, value) => ({ [field]: { $gt: parseFloat(value) } }),
// 		gte: (field, value) => ({ [field]: { $gte: parseFloat(value) } }),
// 		lt: (field, value) => ({ [field]: { $lt: parseFloat(value) } }),
// 		lte: (field, value) => ({ [field]: { $lte: parseFloat(value) } }),
// 		ne: (field, value) => ({ [field]: { $ne: value } }),
// 		in: (field, value) => ({ [field]: { $in: value.split('|') } }),
// 		like: (field, value) => ({
// 			[field]: { $regex: value, $options: 'i' },
// 		}),
// 	};

// 	const filter = {};

// 	const filters = filterStr.split(',');

// 	for (const f of filters) {
// 		const [field, operator, value] = f.split(':');
// 		if (!field || !operator || value === undefined) continue;

// 		const handler = operatorsMap[operator];
// 		if (!handler) continue;

// 		Object.assign(filter, handler(field, value));
// 	}

// 	return filter;
// };

export const getFilterQuery = (req) => {
	const filterStr = req.query.filter;
	if (!filterStr) return { type: 'find', filter: {} };

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

	const hasNested = Object.keys(filter).some((key) => key.includes('.'));

	if (!hasNested) {
		return { type: 'find', filter };
	}

	// Build aggregate pipeline for nested fields
	const lookups = [];
	const usedPaths = new Set();

	for (const path of Object.keys(filter)) {
		const parts = path.split('.');
		if (parts.length < 2) continue;

		let from = '';
		for (let i = 0; i < parts.length - 1; i++) {
			const currentPath = parts.slice(0, i + 1).join('.');
			if (usedPaths.has(currentPath)) continue;
			usedPaths.add(currentPath);

			const localField = parts[i];
			from = currentPath;

			lookups.push(
				{
					$lookup: {
						from: getCollectionName(parts[i]),
						localField: localField,
						foreignField: '_id',
						as: currentPath,
					},
				},
				{
					$unwind: {
						path: `$${currentPath}`,
						preserveNullAndEmptyArrays: true,
					},
				}
			);
		}
	}

	const pipeline = [...lookups, { $match: filter }];

	return {
		type: 'aggregate',
		pipeline,
	};
};

const controllerHelper = {
	getPaginationParams,
	getSortParams,
	getFilterQuery,
	handleAsync,
};

export default controllerHelper;
