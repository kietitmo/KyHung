import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Link,
	Alert,
	Paper,
} from '@mui/material';
import { login, clearError } from '../store/slices/authSlice';

const validationSchema = Yup.object({
	email: Yup.string().email('Enter a valid email').required('Email is required'),
	password: Yup.string()
		.min(8, 'Password should be of minimum 8 characters length')
		.required('Password is required'),
});

const Login = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { loading, error } = useSelector((state) => state.auth);

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: validationSchema,
		onSubmit: async (values) => {
			const result = await dispatch(login(values));
			if (!result.error) {
				navigate('/');
			}
		},
	});

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
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				{error && (
					<Alert severity="error" sx={{ mt: 2, width: '100%' }}>
						{error}
					</Alert>
				)}
				<Box
					component="form"
					onSubmit={formik.handleSubmit}
					sx={{ mt: 1, width: '100%' }}
				>
					<TextField
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={formik.values.email}
						onChange={formik.handleChange}
						error={formik.touched.email && Boolean(formik.errors.email)}
						helperText={formik.touched.email && formik.errors.email}
					/>
					<TextField
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						value={formik.values.password}
						onChange={formik.handleChange}
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
						disabled={loading}
					>
						{loading ? 'Signing in...' : 'Sign In'}
					</Button>
					<Box sx={{ textAlign: 'center' }}>
						<Link component={RouterLink} to="/register" variant="body2">
							{"Don't have an account? Sign Up"}
						</Link>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};

export default Login;
