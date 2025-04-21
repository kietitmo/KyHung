import env from '../config/env.js';

// middlewares/customCors.middleware.js
export default function customCorsMiddleware(req, res, next) {
	const origin = env.WEB_HOSTNAME || 'http://localhost:5173';
	res.setHeader('Access-Control-Allow-Origin', origin);
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET,POST,PUT,DELETE,PATCH,OPTIONS'
	);
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}

	next();
}
