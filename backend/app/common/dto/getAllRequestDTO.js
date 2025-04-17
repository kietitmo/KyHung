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

		return new GetAllRequestDTO(filter, limit, page, sort);
	}
}

export default GetAllRequestDTO;
