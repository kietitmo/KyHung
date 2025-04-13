class UserDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.phoneNumber = user.phoneNumber;
		this.address = user.address;
		this.city = user.city;
		this.country = user.country;
		this.gender = user.gender;
	}

	static fromEntity(user) {
		return new UserDTO(user);
	}
}

export default UserDTO;
