# Logging System

This directory contains utilities for logging throughout the application.

## Logger (`logger.js`)

The main logger utility provides different log levels and formatting options.

### Log Levels

- `DEBUG`: Detailed information for debugging
- `INFO`: General information about application operation
- `WARN`: Warning messages for potentially harmful situations
- `ERROR`: Error messages for serious problems

### Usage

```javascript
import logger from './utils/logger';

// Log a debug message
logger.debug('This is a debug message', { someData: 'value' });

// Log an info message
logger.info('This is an info message', { someData: 'value' });

// Log a warning message
logger.warn('This is a warning message', { someData: 'value' });

// Log an error message
logger.error('This is an error message', { someData: 'value' });

// Log API requests
logger.logApiRequest(
	'GET',
	'/api/products',
	{ page: 1 },
	{ Authorization: 'Bearer token' }
);

// Log API responses
logger.logApiResponse('GET', '/api/products', 200, { data: [] });

// Log API errors
logger.logApiError('GET', '/api/products', error);

// Set log level
logger.setLogLevel('INFO'); // Only show INFO and above
```

## Redux Logger (`reduxLogger.js`)

A Redux middleware for logging state changes.

### Usage

```javascript
import { configureStore } from '@reduxjs/toolkit';
import reduxLogger from './utils/reduxLogger';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(reduxLogger),
});
```

## Component Logger (`componentLogger.js`)

A higher-order component for logging React component lifecycle events.

### Usage

```javascript
import withComponentLogger from './utils/componentLogger';

const MyComponent = (props) => {
	// Component implementation
};

export default withComponentLogger(MyComponent, 'MyComponent');
```

## Error Boundary (`ErrorBoundary.jsx`)

A React error boundary component for catching and logging errors.

### Usage

```javascript
import ErrorBoundary from './utils/ErrorBoundary';

function App() {
	return <ErrorBoundary>{/* Your application components */}</ErrorBoundary>;
}
```

## Environment Configuration

The logger automatically adjusts based on the environment:

- In development: All log levels are shown
- In production: Only INFO and above are shown

## Best Practices

1. Use appropriate log levels:

   - `DEBUG`: For detailed information useful during development
   - `INFO`: For general operational information
   - `WARN`: For potentially harmful situations
   - `ERROR`: For serious problems that need attention

2. Include relevant data with log messages:

   ```javascript
   logger.error('Failed to fetch user', { userId, error: error.message });
   ```

3. Sanitize sensitive data:

   - The API logger automatically redacts authorization tokens
   - Be careful not to log sensitive user information

4. Use component logging for complex components:

   - Wrap important components with `withComponentLogger`
   - This helps track component lifecycle and prop changes

5. Use the error boundary for graceful error handling:
   - Wrap your app or important sections with `ErrorBoundary`
   - This prevents the entire app from crashing due to a single component error
