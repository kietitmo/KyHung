class Pagination {
	constructor(data, page, limit, total, totalPages) {
		this.data = data;
		this.page = page;
		this.limit = limit;
		this.total = total;
		this.totalPages = totalPages;
	}
}

export default Pagination;
