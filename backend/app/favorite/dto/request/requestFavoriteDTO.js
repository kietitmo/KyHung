class RequestFavoriteDTO {
	constructor(email, productId, quantity, note) {
		this.productId = productId;
		this.email = email;
		this.quantity = quantity;
		this.note = note;
	}

	static fromRequest(email, productId, quantity, note) {
		return new RequestFavoriteDTO(email, productId, quantity, note);
	}
}

export default RequestFavoriteDTO;
