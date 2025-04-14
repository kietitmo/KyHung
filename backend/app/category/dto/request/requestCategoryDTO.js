class RequestCategoryDTO {
	constructor(name, description) {
		this.name = name;
		this.description = description;
	}

	static fromRequest(name, description) {
		return new RequestCategoryDTO(name, description);
	}
}

export default RequestCategoryDTO;
