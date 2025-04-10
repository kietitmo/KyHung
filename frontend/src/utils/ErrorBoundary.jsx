import React from 'react';
import logger from './logger';

/**
 * Error Boundary component for catching and logging React errors
 */
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		// Log the error
		logger.error('React Error Boundary Caught Error', {
			error: error.toString(),
			componentStack: errorInfo.componentStack,
		});

		// Update state with error details
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<div
					style={{
						padding: '20px',
						margin: '20px',
						border: '1px solid #e74c3c',
						borderRadius: '4px',
						backgroundColor: '#fdf3f2',
						color: '#333',
					}}
				>
					<h2>Something went wrong</h2>
					<details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
						{this.state.error && this.state.error.toString()}
						<br />
						{this.state.errorInfo && this.state.errorInfo.componentStack}
					</details>
					<button
						onClick={() => window.location.reload()}
						style={{
							marginTop: '20px',
							padding: '8px 16px',
							backgroundColor: '#3498db',
							color: 'white',
							border: 'none',
							borderRadius: '4px',
							cursor: 'pointer',
						}}
					>
						Reload Page
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
