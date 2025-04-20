class RequestCategoryDTO {
	constructor(data) {
		this.name = data.name;
		this.description = data.description;
	}

	static fromRequest(data) {
		return new RequestCategoryDTO(data);
	}
}

export default RequestCategoryDTO;
