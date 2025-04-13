class RequestUserDTO {
	constructor(
		fullName,
		email,
		password,
		gender,
		phoneNumber,
		address,
		city,
		country,
		role,
		isVerified,
		isBlocked,
		blockedReason,
		blockedAt
	) {
		this.fullName = fullName;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.city = city;
		this.country = country;
		this.role = role;
		this.isVerified = isVerified;
		this.isBlocked = isBlocked;
		this.blockedReason = blockedReason;
		this.blockedAt = blockedAt;
	}

	static fromRequest(requestData) {
		return new RequestUserDTO(
			requestData.fullName,
			requestData.email,
			requestData.password,
			requestData.gender,
			requestData.phoneNumber,
			requestData.address,
			requestData.city,
			requestData.country,
			requestData.role,
			requestData.isVerified,
			requestData.isBlocked,
			requestData.blockedReason,
			requestData.blockedAt
		);
	}
}

export default RequestUserDTO;
