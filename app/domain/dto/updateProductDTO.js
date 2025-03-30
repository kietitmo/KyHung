// updateProductDTO.js
class UpdateProductDTO {
	static fromRequest(data) {
		return {
			name: data.name,
			category: data.category,
			price: data.price,
			description: data.description,
			imageUrl: data.imageUrl,
			videoUrl: data.videoUrl,
		};
	}
}

export default UpdateProductDTO;
