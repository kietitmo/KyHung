import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import env from '../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logsDir)) {
	fs.mkdirSync(logsDir);
}

// Custom format for development
const devFormat = winston.format.combine(
	winston.format.colorize(),
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.printf(({ level, message, timestamp, ...metadata }) => {
		let msg = `${timestamp} [${level}]: ${message}`;
		if (Object.keys(metadata).length > 0) {
			msg += ` ${JSON.stringify(metadata)}`;
		}
		return msg;
	})
);

// Custom format for production
const prodFormat = winston.format.combine(
	winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
	winston.format.json()
);

// Create Winston logger with environment-specific configuration
const winstonLogger = winston.createLogger({
	level: env.NODE_ENV === 'production' ? 'info' : 'debug',
	format: env.NODE_ENV === 'production' ? prodFormat : devFormat,
	transports: [
		// Error logs - always write to file
		new winston.transports.File({
			filename: path.join(logsDir, 'error.log'),
			level: 'error',
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
		// Combined logs - always write to file
		new winston.transports.File({
			filename: path.join(logsDir, 'combined.log'),
			maxsize: 5242880, // 5MB
			maxFiles: 5,
		}),
		// Console transport - only in development
		...(env.NODE_ENV !== 'production' ? [new winston.transports.Console()] : []),
	],
});

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(path.join(logsDir, 'access.log'), {
	flags: 'a',
});

// Custom token for request body (sanitized)
morgan.token('body', (req) => {
	const sanitizedBody = { ...req.body };
	// Remove sensitive data
	if (sanitizedBody.password) sanitizedBody.password = '[REDACTED]';
	if (sanitizedBody.token) sanitizedBody.token = '[REDACTED]';
	if (sanitizedBody.refreshToken) sanitizedBody.refreshToken = '[REDACTED]';
	return JSON.stringify(sanitizedBody);
});

// Custom token for response time in seconds
morgan.token('response-time-seconds', (req, res) => {
	if (!res._header || !req._startAt) return '';
	const diff = process.hrtime(req._startAt);
	const time = diff[0] * 1e3 + diff[1] * 1e-6;
	return time.toFixed(3) + 's';
});

// Development format - detailed
const devMorganFormat =
	':method :url :status :response-time-seconds ms - :res[content-length] - :body';

// Production format - minimal
const prodMorganFormat =
	':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time-seconds';

// Create Morgan middleware
const morganMiddleware = (app) => {
	// Development logging
	if (env.NODE_ENV !== 'production') {
		app.use(morgan(devMorganFormat));
		return;
	}

	// Production logging
	// Log all requests to access.log
	app.use(morgan(prodMorganFormat, { stream: accessLogStream }));

	// Log errors to error.log
	app.use(
		morgan(prodMorganFormat, {
			skip: (req, res) => res.statusCode < 400,
			stream: {
				write: (message) => {
					winstonLogger.error(message.trim());
				},
			},
		})
	);
};

// Create a logger interface with environment-specific methods
const logger = {
	error: (message, ...meta) => {
		winstonLogger.error(message, ...meta);
	},
	warn: (message, ...meta) => {
		winstonLogger.warn(message, ...meta);
	},
	info: (message, ...meta) => {
		winstonLogger.info(message, ...meta);
	},
	debug: (message, ...meta) => {
		winstonLogger.debug(message, ...meta);
	},
	// Development-only console logging
	console:
		env.NODE_ENV !== 'production'
			? (...args) => {
					console.log(...args);
					winstonLogger.debug(args.join(' '));
				}
			: () => {},
};

export { logger, morganMiddleware };
