import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Role from './role.enum.js';
const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: false },
		role: {
			type: String,
			enum: Object.values(Role),
			default: Role.USER,
		},
		isVerified: { type: Boolean, required: true, default: false },
		favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
