class BlockUserRequestDTO {
	constructor(data) {
		this.email = data.email;
		this.reason = data.reason;
	}

	static fromRequest(data) {
		return new BlockUserRequestDTO(data);
	}
}

export default BlockUserRequestDTO;
