import { Link as RouterLink } from 'react-router-dom';
import {
	Container,
	Box,
	Typography,
	Button,
	Grid,
	Card,
	CardContent,
	CardActions,
} from '@mui/material';

const features = [
	{
		title: 'User Authentication',
		description: 'Secure login and registration system with email verification.',
	},
	{
		title: 'Product Management',
		description: 'Browse and manage products with a user-friendly interface.',
	},
	{
		title: 'User Profiles',
		description: 'Personalized user profiles with customizable settings.',
	},
];

const Home = () => {
	return (
		<Container>
			<Box
				sx={{
					pt: 8,
					pb: 6,
					textAlign: 'center',
				}}
			>
				<Typography component="h1" variant="h2" color="text.primary" gutterBottom>
					Welcome to Your App
				</Typography>
				<Typography variant="h5" color="text.secondary" paragraph>
					A modern web application with secure authentication and product management
					features.
				</Typography>
				<Box
					sx={{
						mt: 4,
						display: 'flex',
						justifyContent: 'center',
						gap: 2,
					}}
				>
					<Button
						component={RouterLink}
						to="/products"
						variant="contained"
						size="large"
					>
						Browse Products
					</Button>
					<Button
						component={RouterLink}
						to="/register"
						variant="outlined"
						size="large"
					>
						Get Started
					</Button>
				</Box>
			</Box>

			<Grid container spacing={4} sx={{ mt: 4 }}>
				{features.map((feature, index) => (
					<Grid item key={index} xs={12} md={4}>
						<Card
							sx={{
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
							}}
						>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography gutterBottom variant="h5" component="h2">
									{feature.title}
								</Typography>
								<Typography>{feature.description}</Typography>
							</CardContent>
							<CardActions>
								<Button size="small" color="primary">
									Learn More
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Home;
