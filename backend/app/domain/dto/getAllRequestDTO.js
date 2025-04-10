class GetAllRequestDTO {
	constructor(filter, limit, page) {
		this.filter = filter || {};
		this.limit = parseInt(limit) || 100;
		this.page = parseInt(page) || 1;
	}

	static fromRequest(req) {
		const { filter, page = 1, limit = 100 } = req.query;
		let _filter = {};

		if (filter) {
			// Parse search parameter as JSON if it's a string
			try {
				const searchConditions =
					typeof filter === 'string' ? JSON.parse(filter) : filter;

				// Apply all search conditions to filter
				Object.assign(_filter, searchConditions);
			} catch (error) {
				// If search is not valid JSON, treat it as a simple search term
				_filter = {};
			}
		}

		return new GetAllRequestDTO(_filter, limit, page);
	}
}

export default GetAllRequestDTO;
