class FavoriteAdminDTO {
	constructor(favorite) {
		this.product = favorite.product;
		this.user = favorite.user;
		this.quantity = favorite.quantity;
		this.note = favorite.note;
		this.createdAt = favorite.createdAt;
		this.updatedAt = favorite.updatedAt;
	}

	static fromRequest(favorite) {
		return new FavoriteAdminDTO(favorite);
	}
}

export default FavoriteAdminDTO;
