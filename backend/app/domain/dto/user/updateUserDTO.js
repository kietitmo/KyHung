class UpdateUserDTO {
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
		this.fullName = fullName || null;
		this.email = email || null;
		this.password = password || null;
		this.gender = gender || null;
		this.phoneNumber = phoneNumber || null;
		this.address = address || null;
		this.city = city || null;
		this.country = country || null;
	}

	static fromRequest(requestData) {
		return new UpdateUserDTO(
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

export default UpdateUserDTO;
