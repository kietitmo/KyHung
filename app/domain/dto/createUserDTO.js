class CreateUserDTO {
	constructor(fullName, email, password) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
	}

	static fromRequest(requestData) {
		return new CreateUserDTO(
			requestData.fullName,
			requestData.email,
			requestData.password
		);
	}
}

export default CreateUserDTO;
