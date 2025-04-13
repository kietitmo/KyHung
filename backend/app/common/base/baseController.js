import { logger } from '../middlewares/logger.middleware.js';
import APIResponse from '../custom/apiResponse.js';
import env from '../config/env.js';

class BaseController {
	constructor(service) {
		this.service = service;
	}

	// Generic CRUD operations
	async create(req, res, next) {
		try {
			logger.info(`Creating new ${this.service.constructor.name}`, req.body);
			const data = await this.service.create(req.body);
			const response = APIResponse.success(
				`${this.service.constructor.name} created successfully`,
				data
			);
			return res.status(201).json(response);
		} catch (error) {
			logger.error(`Error creating ${this.service.constructor.name}`, error);
			next(error);
		}
	}

	async findAll(req, res, next) {
		try {
			logger.info(`Getting all ${this.service.constructor.name}s`, req.query);
			const { page, limit, offset } = this.getPaginationParams(req);
			const sort = this.getSortParams(req);
			const search = this.getSearchQuery(req);

			const { data, total } = await this.service.findAll({
				page,
				limit,
				offset,
				sort,
				search,
				...req.query,
			});

			const response = APIResponse.success(
				`${this.service.constructor.name}s retrieved successfully`,
				{
					data,
					pagination: {
						total,
						page,
						limit,
						pages: Math.ceil(total / limit),
					},
				}
			);
			return res.status(200).json(response);
		} catch (error) {
			logger.error(`Error getting ${this.service.constructor.name}s`, error);
			next(error);
		}
	}

	async findOne(req, res, next) {
		try {
			logger.info(`Getting ${this.service.constructor.name} by id`, req.params.id);
			const data = await this.service.findById(req.params.id);
			const response = APIResponse.success(
				`${this.service.constructor.name} retrieved successfully`,
				data
			);
			return res.status(200).json(response);
		} catch (error) {
			logger.error(`Error getting ${this.service.constructor.name} by id`, error);
			next(error);
		}
	}

	async update(req, res, next) {
		try {
			logger.info(
				`Updating ${this.service.constructor.name}`,
				req.params.id,
				req.body
			);
			const data = await this.service.update(req.params.id, req.body);
			const response = APIResponse.success(
				`${this.service.constructor.name} updated successfully`,
				data
			);
			return res.status(200).json(response);
		} catch (error) {
			logger.error(`Error updating ${this.service.constructor.name}`, error);
			next(error);
		}
	}

	async delete(req, res, next) {
		try {
			logger.info(`Deleting ${this.service.constructor.name}`, req.params.id);
			await this.service.delete(req.params.id);
			const response = APIResponse.success(
				`${this.service.constructor.name} deleted successfully`
			);
			return res.status(200).json(response);
		} catch (error) {
			logger.error(`Error deleting ${this.service.constructor.name}`, error);
			next(error);
		}
	}

	// Helper methods
	getPaginationParams(req) {
		const page = parseInt(req.query.page) || 1;
		const limit = parseInt(req.query.limit) || env.DEFAULT_PAGE_SIZE;
		const offset = (page - 1) * limit;

		return { page, limit, offset };
	}

	getSortParams(req) {
		const defaultSort = { createdAt: -1 };
		const sortQuery = req.query.sort;

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
	}

	getSearchQuery(req, searchFields = []) {
		const searchTerm = req.query.search;
		if (!searchTerm || searchFields.length === 0) return {};

		return {
			$or: searchFields.map((field) => ({
				[field]: { $regex: searchTerm, $options: 'i' },
			})),
		};
	}
}

export default BaseController;
