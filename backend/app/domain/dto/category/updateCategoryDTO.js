class UpdateCategoryDTO {
	constructor(data) {
		this.name = data.name;
		this.description = data.description;
	}

	static fromRequest(data) {
		return new UpdateCategoryDTO(data);
	}
}

export default UpdateCategoryDTO;