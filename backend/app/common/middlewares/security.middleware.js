import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import cors from 'cors';
import env from '../config/env.js';

/**
 * Apply security middleware to the Express application
 * @param {Express.Application} app - Express application
 */
const applySecurityMiddleware = (app) => {
	// Set security HTTP headers with strict CSP
	app.use(
		helmet({
			contentSecurityPolicy: {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", "'unsafe-inline'"],
					styleSrc: ["'self'", "'unsafe-inline'"],
					imgSrc: ["'self'", 'data:', 'https:'],
					connectSrc: ["'self'"],
					fontSrc: ["'self'"],
					objectSrc: ["'none'"],
					mediaSrc: ["'self'"],
					frameSrc: ["'none'"],
				},
			},
			crossOriginEmbedderPolicy: true,
			crossOriginOpenerPolicy: true,
			crossOriginResourcePolicy: { policy: 'same-site' },
			dnsPrefetchControl: true,
			frameguard: { action: 'deny' },
			hidePoweredBy: true,
			hsts: {
				maxAge: 31536000,
				includeSubDomains: true,
				preload: true,
			},
			ieNoOpen: true,
			noSniff: true,
			referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
			xssFilter: true,
		})
	);

	// Data sanitization against NoSQL query injection
	app.use(
		mongoSanitize({
			onSanitize: ({ req, key }) => {
				console.warn(`This request[${key}] is sanitized`, req);
			},
		})
	);

	// Data sanitization against XSS
	app.use(xss());

	// Prevent parameter pollution
	app.use(
		hpp({
			whitelist: [
				'price',
				'rating',
				'category',
				'sort',
				'fields',
				'page',
				'limit',
			],
		})
	);

	// Enable CORS with secure configuration
	const corsOptions = {
		origin: env.NODE_ENV === 'production' ? [env.CORS_ORIGIN] : true,
		methods: env.CORS_METHODS,
		credentials: env.CORS_CREDENTIALS,
		allowedHeaders: [
			'Content-Type',
			'Authorization',
			'X-Requested-With',
			'Accept',
			'Origin',
		],
		exposedHeaders: ['Content-Range', 'X-Content-Range'],
		maxAge: 600, // 10 minutes
		preflightContinue: false,
		optionsSuccessStatus: 204,
	};
	app.use(cors(corsOptions));

	// Trust proxy if behind a reverse proxy
	if (env.NODE_ENV === 'production') {
		app.set('trust proxy', 1);
	}

	// // Set secure cookie flags
	// app.use((req, res, next) => {
	// 	res.cookie('cookieName', 'cookieValue', {
	// 		httpOnly: env.COOKIE_HTTP_ONLY,
	// 		secure: env.COOKIE_SECURE,
	// 		sameSite: 'strict',
	// 		signed: true,
	// 	});
	// 	next();
	// });

	// Add security headers
	app.use((req, res, next) => {
		res.setHeader('X-Content-Type-Options', 'nosniff');
		res.setHeader('X-Frame-Options', 'DENY');
		res.setHeader('X-XSS-Protection', '1; mode=block');
		res.setHeader(
			'Strict-Transport-Security',
			'max-age=31536000; includeSubDomains; preload'
		);
		res.setHeader('X-Download-Options', 'noopen');
		res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
		next();
	});
};

export default applySecurityMiddleware;
