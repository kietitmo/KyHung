import Role from '../../domain/models/role.enum.js';
import UserDTO from './userDTO.js';
import AdminUserDTO from './adminUserDTO.js';

export const UserDTOFactory = {
	fromEntity(user, role) {
		switch (role) {
			case Role.USER:
				return UserDTO.fromEntity(user);
			case Role.ADMIN:
				return AdminUserDTO.fromEntity(user);
			default:
				return UserDTO.fromEntity(user);
		}
	},
};

export default UserDTOFactory;
