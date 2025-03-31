// userDTO.js
import ProductDTO from '../product/productDTO.js'; // Đảm bảo bạn có ProductDTO để chuyển đổi sản phẩm

class UserDTO {
	constructor(user) {
		this.fullName = user.fullName;
		this.email = user.email;
		this.favoriteProducts = user.favoriteProducts.map((product) =>
			ProductDTO.fromEntity(product)
		);
	}

	static fromEntity(user) {
		return new UserDTO(user);
	}
}

export default UserDTO;
