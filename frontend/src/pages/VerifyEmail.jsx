import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
	Container,
	Box,
	Typography,
	Button,
	Alert,
	Paper,
	CircularProgress,
} from '@mui/material';
import { verifyEmail, clearError } from '../store/slices/authSlice';

const VerifyEmail = () => {
	const [searchParams] = useSearchParams();
	const token = searchParams.get('token');
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);
	const [verificationStatus, setVerificationStatus] = useState('pending');

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	useEffect(() => {
		const verifyEmailToken = async () => {
			if (token) {
				const result = await dispatch(verifyEmail(token));
				if (!result.error) {
					setVerificationStatus('success');
					setTimeout(() => {
						navigate('/login');
					}, 3000);
				} else {
					setVerificationStatus('error');
				}
			}
		};

		verifyEmailToken();
	}, [token, dispatch, navigate]);

	const handleResendVerification = async () => {
		// TODO: Implement resend verification email functionality
	};

	return (
		<Container component="main" maxWidth="xs">
			<Paper
				elevation={3}
				sx={{
					marginTop: 8,
					padding: 4,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography component="h1" variant="h5" gutterBottom>
					Email Verification
				</Typography>

				{loading && (
					<Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
						<CircularProgress size={24} sx={{ mr: 1 }} />
						<Typography>Verifying your email...</Typography>
					</Box>
				)}

				{verificationStatus === 'success' && (
					<Alert severity="success" sx={{ mt: 2, width: '100%' }}>
						Your email has been verified successfully! Redirecting to login...
					</Alert>
				)}

				{verificationStatus === 'error' && (
					<>
						<Alert severity="error" sx={{ mt: 2, width: '100%' }}>
							{error || 'Failed to verify email. Please try again.'}
						</Alert>
						<Button
							variant="contained"
							onClick={handleResendVerification}
							sx={{ mt: 2 }}
						>
							Resend Verification Email
						</Button>
					</>
				)}

				{!token && (
					<Alert severity="info" sx={{ mt: 2, width: '100%' }}>
						Please check your email for the verification link.
					</Alert>
				)}
			</Paper>
		</Container>
	);
};

export default VerifyEmail;
