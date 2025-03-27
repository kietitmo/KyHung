import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../../data-access/repositories/userRepository.js';
import dotenv from 'dotenv';

dotenv.config();

// thieu dang ky
class AuthService {
	// Đăng nhập và tạo JWT
	static async login(email, password) {
		const user = await UserRepository.findByEmail(email);

		if (!user) {
			throw new Error('Invalid credentials');
		}

		// Kiểm tra mật khẩu
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			throw new Error('Invalid credentials');
		}

		// Tạo access token (JWT)
		const payload = { email: user.email, role: user.role }; // Payload chứa thông tin cần thiết
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		// Tạo refresh token (Có thể lưu vào DB nếu cần)
		const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
			expiresIn: '7d',
		});

		return { accessToken, refreshToken };
	}

	// Làm mới access token từ refresh token
	static async refreshAccessToken(refreshToken) {
		try {
			const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
			const newAccessToken = jwt.sign(
				{ email: user.email, role: user.role },
				process.env.JWT_SECRET,
				{ expiresIn: '1h' }
			);

			return newAccessToken;
		} catch (err) {
			throw new Error('Invalid or expired refresh token');
		}
	}

	// Mã hóa mật khẩu người dùng khi đăng ký
	static async hashPassword(password) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	}
}

export default AuthService;
