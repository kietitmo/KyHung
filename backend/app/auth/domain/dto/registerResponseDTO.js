class RegisterResponseDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.phoneNumber = user.phoneNumber;
		this.address = user.address;
		this.city = user.city;
		this.country = user.country;
		this.gender = user.gender;
		this.role = user.role;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new RegisterResponseDTO(user);
	}
}
export default RegisterResponseDTO;
