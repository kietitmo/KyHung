class GetAllRequestDTO {
	constructor(filter, limit, page) {
		this.filter = filter || {};
		this.limit = limit || 100;
		this.page = page || 1;
	}

	static fromRequest(requestData) {
		return new GetAllRequestDTO(
			requestData.filter,
			requestData.limit,
			requestData.page
		);
	}
}

export default GetAllRequestDTO;
