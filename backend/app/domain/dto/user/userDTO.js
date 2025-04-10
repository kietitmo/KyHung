import ProductDTO from '../product/productDTO.js';

class UserDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.phoneNumber = user.phoneNumber;
		this.address = user.address;
		this.city = user.city;
		this.country = user.country;
		this.gender = user.gender;
		this.email = user.email;
		this.role = user.role;
		this.favoriteProducts = user.favoriteProducts.map((product) =>
			ProductDTO.fromEntity(product)
		);
		this.isVerified = user.isVerified;
		this.isBlocked = user.isBlocked;
		this.blockedReason = user.blockedReason;
		this.blockedAt = user.blockedAt;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new UserDTO(user);
	}
}

export default UserDTO;
