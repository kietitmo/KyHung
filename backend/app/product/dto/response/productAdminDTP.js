import CategoryAdminDTO from '../../../category/dto/response/categoryAdminDTO.js';

class ProductAdminDTO {
	constructor(product) {
		this.id = product._id;
		this.name = product.name;
		this.category = CategoryAdminDTO.fromEntity(product.category);
		this.price = product.price;
		this.description = product.description;
		this.imageUrl = product.imageUrl;
		this.videoUrl = product.videoUrl;
		this.createdAt = product.createdAt;
		this.updatedAt = product.updatedAt;
	}

	static fromEntity(product) {
		return new ProductAdminDTO(product);
	}
}

export default ProductAdminDTO;
