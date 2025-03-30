import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Role from './role.enum.js';
const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: Object.values(Role),
			default: Role.USER,
		},
		favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	},
	{ timestamps: true }
);

// Mã hóa mật khẩu trước khi lưu vào DB
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

// Kiểm tra mật khẩu khi đăng nhập
userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
