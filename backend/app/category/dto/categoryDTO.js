class CategoryDTO {
	constructor(cat) {
		this.id = cat._id || null;
		this.name = cat.name || null;
		this.description = cat.description || null;
		this.createdAt = cat.createdAt || null;
		this.updatedAt = cat.updatedAt || null;
	}

	static fromEntity(cat) {
		return new CategoryDTO(cat);
	}
}

export default CategoryDTO;
