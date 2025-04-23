class ProductRequestDTO {
	constructor(data) {
		this.name = data.name;
		this.category = data.category;
		this.price = data.price;
		this.description = data.description;
		this.thumbnail = data.thumbnail;
		this.images = data.images;
		this.videos = data.videos;
	}

	static fromRequest(data) {
		return new ProductRequestDTO(data);
	}
}

export default ProductRequestDTO;
