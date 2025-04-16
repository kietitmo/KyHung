import swaggerJsdoc from 'swagger-jsdoc';
import env from './env.js';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'E-Commerce API Documentation',
			version: '1.0.0',
			description: 'API documentation for the E-Commerce application',
			contact: {
				name: 'API Support',
				email: 'support@example.com',
				url: 'https://example.com/support',
			},
			license: {
				name: 'MIT',
				url: 'https://opensource.org/licenses/MIT',
			},
		},
		servers: [
			{
				url:
					env.NODE_ENV === 'production'
						? 'https://loclahost'
						: 'http://localhost:5001',
				description:
					env.NODE_ENV === 'production' ? 'Production server' : 'Development server',
			},
		],
		tags: [
			{
				name: 'Auth',
				description: 'Authentication endpoints',
			},
			{
				name: 'Users',
				description: 'User management endpoints',
			},
			{
				name: 'Products',
				description: 'Product management endpoints',
			},
			{
				name: 'Categories',
				description: 'Category management endpoints',
			},
			{
				name: 'Favorites',
				description: 'Favorite products management endpoints',
			},
			{
				name: 'Admin',
				description: 'Admin management endpoints',
			},
			{
				name: 'Admin/Users',
				description: 'Admin user management endpoints',
			},
			{
				name: 'Admin/Products',
				description: 'Admin product management endpoints',
			},
			{
				name: 'Admin/Categories',
				description: 'Admin category management endpoints',
			},
			{
				name: 'Admin/Auth',
				description: 'Admin authentication endpoints',
			},
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
			schemas: {
				Error: {
					type: 'object',
					properties: {
						status: {
							type: 'string',
							example: 'error',
						},
						code: {
							type: 'number',
							example: 400,
						},
						message: {
							type: 'string',
							example: 'Validation error',
						},
						errors: {
							type: 'array',
							items: {
								type: 'string',
							},
							example: ['User ID is required', 'Invalid user ID format'],
						},
					},
				},
				Success: {
					type: 'object',
					properties: {
						status: {
							type: 'string',
							example: 'success',
						},
						code: {
							type: 'number',
							example: 200,
						},
						message: {
							type: 'string',
							example: 'Operation successful',
						},
						data: {
							type: 'object',
							description: 'Response data',
						},
					},
				},
			},
			responses: {
				Error: {
					description: 'Bad Request - Invalid input data',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
				UnauthorizedError: {
					description: 'Unauthorized - Authentication is required',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
				ForbiddenError: {
					description: 'Forbidden - User does not have required permissions',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
				NotFoundError: {
					description: 'Not Found - Resource not found',
					content: {
						'application/json': {
							schema: {
								$ref: '#/components/schemas/Error',
							},
						},
					},
				},
			},
		},
		security: [
			{
				bearerAuth: [],
			},
		],
	},
	apis: [
		'./app/auth/entry-points/routes/*.js',
		'./app/user/entry-points/routes/*.js',
		'./app/product/entry-points/routes/*.js',
		'./app/category/entry-points/routes/*.js',
		'./app/favorite/entry-points/routes/*.js',
	],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
