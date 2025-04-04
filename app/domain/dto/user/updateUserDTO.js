class UpdateUserDTO {
	constructor(fullName, email, password) {
		this.fullName = fullName || null;
		this.email = email || null;
		this.password = password || null;
	}

	static fromRequest(requestData) {
		return new UpdateUserDTO(
			requestData.fullName,
			requestData.email,
			requestData.password
		);
	}
}

export default UpdateUserDTO;
