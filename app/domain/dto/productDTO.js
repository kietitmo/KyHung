// productDTO.js
class ProductDTO {
	static fromEntity(product) {
		return {
			id: product._id,
			name: product.name,
			category: product.category,
			price: product.price,
			description: product.description,
			imageUrl: product.imageUrl,
			videoUrl: product.videoUrl,
			createdAt: product.createdAt,
			updatedAt: product.updatedAt,
		};
	}
}

export default ProductDTO;
