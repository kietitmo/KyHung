import React from 'react';
import logger from './logger';

/**
 * Higher-order component for logging React component lifecycle events
 * @param {React.ComponentType} WrappedComponent - The component to wrap
 * @param {string} componentName - The name of the component (optional)
 * @returns {React.ComponentType} - The wrapped component
 */
const withComponentLogger = (
	WrappedComponent,
	componentName = WrappedComponent.name
) => {
	// Create a new component
	const WithComponentLogger = (props) => {
		// Log component mount
		React.useEffect(() => {
			logger.debug(`Component Mounted: ${componentName}`, props);

			// Log component unmount
			return () => {
				logger.debug(`Component Unmounted: ${componentName}`);
			};
		}, []);

		// Log component updates
		React.useEffect(() => {
			logger.debug(`Component Updated: ${componentName}`, props);
		});

		// Render the wrapped component
		return <WrappedComponent {...props} />;
	};

	// Set the display name for debugging
	WithComponentLogger.displayName = `WithComponentLogger(${componentName})`;

	return WithComponentLogger;
};

export default withComponentLogger;
