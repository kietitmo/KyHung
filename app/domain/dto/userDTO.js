class UserDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.favorites = user.favorites;
	}

	static fromEntity(user) {
		return new UserDTO(user);
	}
}

export default UserDTO;
