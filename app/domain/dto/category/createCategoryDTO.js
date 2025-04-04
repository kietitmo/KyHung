class CreateCategoryDTO {
	constructor(data) {
		this.name = data.name;
		this.description = data.description;
	}

	static fromRequest(data) {
		return new CreateCategoryDTO(data);
	}
}

export default CreateCategoryDTO;