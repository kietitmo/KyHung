class FavoriteDTO {
	constructor(favorite) {
		this.product = favorite.product;
		this.user = favorite.user;
		this.quantity = favorite.quantity;
		this.note = favorite.note;
	}

	static fromRequest(favorite) {
		return new FavoriteDTO(favorite);
	}
}

export default FavoriteDTO;
