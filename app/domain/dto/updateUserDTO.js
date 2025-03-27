class UpdateUserDTO {
	constructor(name, email, password) {
		this.name = name || null;
		this.email = email || null;
		this.password = password || null;
	}

	static fromRequest(requestData) {
		return new UpdateUserDTO(
			requestData.name,
			requestData.email,
			requestData.password
		);
	}
}

export default UpdateUserDTO;
