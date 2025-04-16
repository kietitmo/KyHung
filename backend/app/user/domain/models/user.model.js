import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Role from './role.enum.js';
import Gender from './gender.enum.js';
import State from './state.enum.js';
import OAuthProvider from './oauthprovider.enum.js';

const userSchema = new mongoose.Schema(
	{
		fullName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: {
			type: String,
			required: function () {
				return !this.oauth;
			},
		},
		oauth: [
			{
				provider: {
					type: String,
					enum: Object.values(OAuthProvider),
					required: false,
				},
				providerId: { type: String, required: false },
			},
		],
		gender: {
			type: String,
			enum: Object.values(Gender),
			default: Gender.OTHER,
		},
		phoneNumber: { type: String, required: false },
		address: { type: String, required: false },
		city: { type: String, required: false },
		country: { type: String, required: false },
		role: {
			type: String,
			enum: Object.values(Role),
			default: Role.USER,
		},
		state: {
			type: String,
			enum: Object.values(State),
			default: State.INACTIVE,
		},
		activeAt: { type: Date, required: false },
	},
	{ timestamps: true }
);

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) return next();
	this.password = await bcrypt.hash(this.password, 10);
	next();
});

userSchema.methods.matchPassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
