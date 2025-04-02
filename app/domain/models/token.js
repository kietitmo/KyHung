import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema(
	{
		tokenValue: { type: String, required: true },
		email: { type: String, required: false },
		expiresAt: { type: Date, required: true },
	},
	{ timestamps: true }
);

const Token = mongoose.model('Token', tokenSchema);

export default Token;
