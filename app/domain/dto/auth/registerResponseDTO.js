class RegisterResponseDTO {
  constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new RegisterResponseDTO(user);
	}
}
export default RegisterResponseDTO;
  