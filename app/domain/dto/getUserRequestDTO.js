class GetUserRequestDTO {
	constructor(filter, limit, page) {
		this.filter = filter || {};
		this.limit = limit || 100;
		this.page = page || 1;
	}

	static fromRequest(requestData) {
		return new GetUserRequestDTO(
			requestData.filter,
			requestData.limit,
			requestData.page
		);
	}
}

export default GetUserRequestDTO;
