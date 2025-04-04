import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import env from '../../config/env.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, '../../../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create a write stream for access logs
const accessLogStream = fs.createWriteStream(
  path.join(logsDir, 'access.log'),
  { flags: 'a' }
);

// Create a write stream for error logs
const errorLogStream = fs.createWriteStream(
  path.join(logsDir, 'error.log'),
  { flags: 'a' }
);

// Custom token for request body
morgan.token('body', (req) => JSON.stringify(req.body));

// Custom token for response time in seconds
morgan.token('response-time-seconds', (req, res) => {
  if (!res._header || !req._startAt) return '';
  const diff = process.hrtime(req._startAt);
  const time = diff[0] * 1e3 + diff[1] * 1e-6;
  return time.toFixed(3) + 's';
});

// Development format
const devFormat = ':method :url :status :response-time-seconds ms - :res[content-length]';

// Production format
const prodFormat = ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';

// Create logger middleware
const logger = (app) => {
  // Log to console in development
  if (env.NODE_ENV === 'development') {
    app.use(morgan(devFormat));
  }
  
  // Log to file in production
  if (env.NODE_ENV === 'production') {
    // Log all requests to access.log
    app.use(morgan(prodFormat, { stream: accessLogStream }));
    
    // Log errors to error.log
    app.use(morgan(prodFormat, {
      skip: (req, res) => res.statusCode < 400,
      stream: errorLogStream
    }));
  }
};

export default logger; 