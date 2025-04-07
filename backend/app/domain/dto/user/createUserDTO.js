class CreateUserDTO {
	constructor(
		fullName,
		email,
		password,
		gender,
		phoneNumber,
		address,
		city,
		country
	) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.city = city;
		this.country = country;
	}

	static fromRequest(requestData) {
		return new CreateUserDTO(
			requestData.fullName,
			requestData.email,
			requestData.password,
			requestData.gender,
			requestData.phoneNumber,
			requestData.address,
			requestData.city,
			requestData.country
		);
	}
}

export default CreateUserDTO;
