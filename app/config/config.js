require('dotenv').config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;

export default {
	PORT,
	MONGODB_URI,
	SECRET,
};
