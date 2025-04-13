class FavoriteProductDTO {
	constructor(data) {
		(this.productId = data.productId), (this.email = data.email);
	}

	static fromRequest(data) {
		return new FavoriteProductDTO(data);
	}
}

export default FavoriteProductDTO;
