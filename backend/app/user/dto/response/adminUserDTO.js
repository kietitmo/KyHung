class AdminUserDTO {
	constructor(user) {
		this.email = user.email;
		this.fullName = user.fullName;
		this.phoneNumber = user.phoneNumber;
		this.address = user.address;
		this.city = user.city;
		this.country = user.country;
		this.gender = user.gender;
		this.role = user.role;
		this.state = user.state;
		this.activeAt = user.activeAt;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new AdminUserDTO(user);
	}
}

export default AdminUserDTO;
