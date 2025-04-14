class CategoryDTO {
	constructor(cat) {
		this.id = cat._id;
		this.name = cat.name;
		this.description = cat.description;
	}

	static fromEntity(cat) {
		return new CategoryDTO(cat);
	}
}

export default CategoryDTO;
