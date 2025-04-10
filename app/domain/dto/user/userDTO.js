import ProductDTO from '../product/productDTO.js';

class UserDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.role = user.role;
		this.favoriteProducts = user.favoriteProducts.map((product) =>
			ProductDTO.fromEntity(product)
		);
		this.isVerified = user.isVerified;
		this.createdAt = user.createdAt;
		this.updatedAt = user.updatedAt;
	}

	static fromEntity(user) {
		return new UserDTO(user);
	}
}

export default UserDTO;
