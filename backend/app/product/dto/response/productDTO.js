import CategoryDTO from '../../../category/dto/response/categoryDTO.js';

class ProductDTO {
	constructor(product) {
		this.id = product._id;
		this.name = product.name;
		this.category = CategoryDTO.fromEntity(product.category);
		this.price = product.price;
		this.description = product.description;
		this.thumbnail = product.thumbnail;
		this.images = product.images;
		this.videos = product.videos;
	}

	static fromEntity(product) {
		return new ProductDTO(product);
	}
}

export default ProductDTO;
