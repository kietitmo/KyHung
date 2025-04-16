import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
	{
		user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
		quantity: { type: Number, default: 1 },
		note: { type: String, default: '' },
	},
	{ timestamps: true }
);

const Favorite = mongoose.model('Favorite', favoriteSchema);

export default Favorite;
