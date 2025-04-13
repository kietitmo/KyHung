class Pagination {
	constructor(data, page, limit, total, totalPages, filter, sort) {
		this.data = data;
		this.page = page;
		this.limit = limit;
		this.total = total;
		this.totalPages = totalPages;
		this.filter = filter;
		this.sort = sort;
	}
}

export default Pagination;
