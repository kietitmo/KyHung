class RegisterResponseDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.phoneNumber = user.phoneNumber;
		this.address = user.address;
		this.city = user.city;
		this.country = user.country;
		this.gender = user.gender;
		this.createdAt = user.createdAt;
		this.isVerified = user.isVerified;
	}

	static fromEntity(user) {
		return new RegisterResponseDTO(user);
	}
}
export default RegisterResponseDTO;
