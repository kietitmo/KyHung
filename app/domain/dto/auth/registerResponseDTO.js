class ResponseRequestDTO {
  constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new ResponseRequestDTO(user);
	}
}
export default ResponseRequestDTO;
  