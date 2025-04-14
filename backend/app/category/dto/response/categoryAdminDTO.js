class CategoryAdminDTO {
	constructor(cat) {
		this.id = cat._id;
		this.name = cat.name;
		this.description = cat.description;
		this.createdAt = cat.createdAt;
		this.updatedAt = cat.updatedAt;
	}

	static fromEntity(cat) {
		return new CategoryAdminDTO(cat);
	}
}

export default CategoryAdminDTO;
