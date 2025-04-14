import {
	getPaginationParams,
	getSortParams,
	getFilterQuery,
} from '../utils/helper.js';

class GetAllRequestDTO {
	constructor(filter, limit, page, sort) {
		this.filter = filter || {};
		this.limit = parseInt(limit) || 100;
		this.page = parseInt(page) || 1;
		this.sort = sort || {};
	}

	static fromRequest(req) {
		const { page, limit, offset } = getPaginationParams(req);
		const sort = getSortParams(req);
		const filter = getFilterQuery(req);

		let _filter = {};

		if (filter) {
			try {
				const searchConditions =
					typeof filter === 'string' ? JSON.parse(filter) : filter;

				Object.assign(_filter, searchConditions);
			} catch (error) {
				_filter = {};
			}
		}
		return new GetAllRequestDTO(_filter, limit, page, sort);
	}
}

export default GetAllRequestDTO;
