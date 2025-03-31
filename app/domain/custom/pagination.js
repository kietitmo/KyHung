class Pagination {
	constructor(data, page, limit, total, totalPages, filter) {
		this.data = data;
		this.page = page;
		this.limit = limit;
		this.total = total;
		this.totalPages = totalPages;
		this.filter = filter;
	}
}

export default Pagination;
