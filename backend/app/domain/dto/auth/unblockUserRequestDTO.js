class UnblockUserRequestDTO {
	constructor(data) {
		this.email = data.email;
	}

	static fromRequest(data) {
		return new UnblockUserRequestDTO(data);
	}
}

export default UnblockUserRequestDTO;
