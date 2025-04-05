import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
	Container,
	Grid,
	Card,
	CardContent,
	CardMedia,
	Typography,
	Button,
	TextField,
	Box,
	Pagination,
	CircularProgress,
	Alert,
} from '@mui/material';
import { fetchProducts, clearError } from '../store/slices/productSlice';

const Products = () => {
	const dispatch = useDispatch();
	const { products, loading, error, totalPages, currentPage } = useSelector(
		(state) => state.products
	);
	const [search, setSearch] = useState('');
	const [searchTimeout, setSearchTimeout] = useState(null);

	useEffect(() => {
		return () => {
			dispatch(clearError());
		};
	}, [dispatch]);

	useEffect(() => {
		dispatch(fetchProducts({ page: currentPage, search }));
	}, [dispatch, currentPage, search]);

	const handleSearchChange = (event) => {
		const value = event.target.value;
		setSearch(value);

		// Clear previous timeout
		if (searchTimeout) {
			clearTimeout(searchTimeout);
		}

		// Set new timeout
		const timeout = setTimeout(() => {
			dispatch(fetchProducts({ page: 1, search: value }));
		}, 500);

		setSearchTimeout(timeout);
	};

	const handlePageChange = (event, value) => {
		dispatch(fetchProducts({ page: value, search }));
	};

	if (loading && !products.length) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '60vh',
				}}
			>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Container>
			<Box sx={{ my: 4 }}>
				<Typography variant="h4" component="h1" gutterBottom>
					Products
				</Typography>
				<TextField
					fullWidth
					label="Search products"
					variant="outlined"
					value={search}
					onChange={handleSearchChange}
					sx={{ mb: 4 }}
				/>
				{error && (
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
				)}
				<Grid container spacing={4}>
					{products.map((product) => (
						<Grid item key={product.id} xs={12} sm={6} md={4}>
							<Card
								sx={{
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
								}}
							>
								<CardMedia
									component="img"
									height="200"
									image={product.image || 'https://via.placeholder.com/300'}
									alt={product.name}
								/>
								<CardContent sx={{ flexGrow: 1 }}>
									<Typography gutterBottom variant="h5" component="h2">
										{product.name}
									</Typography>
									<Typography>{product.description}</Typography>
									<Typography variant="h6" color="primary" sx={{ mt: 2 }}>
										${product.price}
									</Typography>
								</CardContent>
								<Box sx={{ p: 2 }}>
									<Button
										component={RouterLink}
										to={`/products/${product.id}`}
										variant="contained"
										fullWidth
									>
										View Details
									</Button>
								</Box>
							</Card>
						</Grid>
					))}
				</Grid>
				{totalPages > 1 && (
					<Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
						<Pagination
							count={totalPages}
							page={currentPage}
							onChange={handlePageChange}
							color="primary"
						/>
					</Box>
				)}
			</Box>
		</Container>
	);
};

export default Products;
