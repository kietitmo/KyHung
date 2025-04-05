import logger from './logger';

/**
 * Redux middleware for logging state changes
 * @param {object} store - The Redux store
 * @returns {function} - The middleware function
 */
const reduxLogger = (store) => (next) => (action) => {
	// Log the action
	logger.debug(`Redux Action: ${action.type}`, action);

	// Get the state before the action is applied
	const prevState = store.getState();

	// Apply the action
	const result = next(action);

	// Get the state after the action is applied
	const nextState = store.getState();

	// Log the state changes
	logger.debug('Redux State Change', {
		prevState,
		nextState,
		action: action.type,
	});

	return result;
};

export default reduxLogger;
