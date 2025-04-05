import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	Container,
	Box,
	Typography,
	Button,
	Grid,
	Paper,
	CircularProgress,
	Alert,
	Divider,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchProductById, deleteProduct } from '../store/slices/productSlice';

const ProductDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { currentProduct, loading, error } = useSelector(
		(state) => state.products
	);
	const { user } = useSelector((state) => state.auth);
	const isAdmin = user?.role === 'ADMIN';

	useEffect(() => {
		dispatch(fetchProductById(id));
	}, [dispatch, id]);

	const handleDelete = async () => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			try {
				await dispatch(deleteProduct(id)).unwrap();
				navigate('/products');
			} catch (error) {
				console.error('Failed to delete product:', error);
			}
		}
	};

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '50vh',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	if (error) {
		return (
			<Container>
				<Alert severity="error" sx={{ mt: 2 }}>
					{error}
				</Alert>
			</Container>
		);
	}

	if (!currentProduct) {
		return (
			<Container>
				<Alert severity="info" sx={{ mt: 2 }}>
					Product not found
				</Alert>
			</Container>
		);
	}

	return (
		<Container>
			<Box sx={{ mt: 4, mb: 4 }}>
				<Button
					startIcon={<ArrowBackIcon />}
					onClick={() => navigate('/products')}
					sx={{ mb: 3 }}
				>
					Back to Products
				</Button>

				<Paper elevation={3} sx={{ p: 3 }}>
					<Grid container spacing={4}>
						<Grid item xs={12} md={6}>
							<Box
								component="img"
								src={currentProduct.image || 'https://via.placeholder.com/400x300'}
								alt={currentProduct.name}
								sx={{
									width: '100%',
									height: 'auto',
									borderRadius: 1,
								}}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<Typography variant="h4" component="h1" gutterBottom>
								{currentProduct.name}
							</Typography>
							<Typography variant="h5" color="primary" gutterBottom>
								${currentProduct.price.toFixed(2)}
							</Typography>
							<Divider sx={{ my: 2 }} />
							<Typography variant="body1" paragraph>
								{currentProduct.description}
							</Typography>
							<Box sx={{ mt: 3 }}>
								{isAdmin && (
									<Box sx={{ display: 'flex', gap: 2 }}>
										<Button
											variant="contained"
											color="primary"
											startIcon={<EditIcon />}
											onClick={() => navigate(`/products/${id}/edit`)}
										>
											Edit
										</Button>
										<Button
											variant="contained"
											color="error"
											startIcon={<DeleteIcon />}
											onClick={handleDelete}
										>
											Delete
										</Button>
									</Box>
								)}
							</Box>
						</Grid>
					</Grid>
				</Paper>
			</Box>
		</Container>
	);
};

export default ProductDetail;
