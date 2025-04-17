class RequestFavoriteDTO {
	constructor(data) {
		this.productId = data.productId;
		this.email = data.email;
		this.quantity = data.quantity;
		this.note = data.note;
	}

	static fromRequest(data) {
		return new RequestFavoriteDTO(data);
	}
}

export default RequestFavoriteDTO;
