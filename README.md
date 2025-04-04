# E-Commerce API

A robust RESTful API for an e-commerce application built with Node.js, Express, and MongoDB.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **User Management**: CRUD operations for users with role-based access control
- **Product Management**: CRUD operations for products
- **Category Management**: CRUD operations for categories
- **Favorite Products**: Add/remove products to/from favorites
- **Google OAuth**: Login with Google
- **Email Verification**: Email verification for new users
- **Password Reset**: Forgot password functionality
- **API Documentation**: Swagger UI for API documentation
- **Security**: Rate limiting, helmet, XSS protection, etc.
- **Logging**: Request logging with Morgan

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Passport.js**: Authentication middleware
- **Swagger**: API documentation
- **Joi**: Data validation
- **Nodemailer**: Email sending
- **Bcrypt**: Password hashing

## Project Structure

```
app/
├── config/             # Configuration files
├── data-access/        # Database access layer
├── domain/             # Domain models and business logic
├── entry-points/       # API endpoints, controllers, middlewares
├── utils/              # Utility functions
└── app.js              # Application entry point
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd <repository-name>
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables
   ```
   APP_HOSTNAME=localhost:5000
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   JWT_SECRET=your_jwt_secret
   JWT_SECRET_EXPIRE_TIME=1h
   JWT_REFRESH_SECRET=your_jwt_refresh_secret
   JWT_REFRESH_SECRET_EXPIRE_TIME=7d
   SALT_JWT=10
   NODE_ENV=development
   EMAIL_HOST=smtp.example.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   ```

4. Start the server
   ```
   npm start
   ```

5. Access the API documentation at `http://localhost:5000/api-docs`

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login user
- `POST /api/auth/refresh-token`: Refresh access token
- `POST /api/auth/logout`: Logout user
- `POST /api/auth/reset-password`: Reset password
- `GET /api/auth/verify-email/:token`: Verify email
- `GET /api/auth/resend-token/:email`: Resend verification token
- `GET /api/auth/forgot-password/:email`: Request password reset
- `GET /api/auth/google`: Login with Google
- `GET /api/auth/google/callback`: Google OAuth callback

### Users

- `GET /api/users`: Get all users
- `GET /api/users/:email`: Get user by email
- `POST /api/users`: Create a new user
- `PUT /api/users/:email`: Update user by email
- `DELETE /api/users/:email`: Delete user by email

### Products

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product by ID
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update product by ID
- `DELETE /api/products/:id`: Delete product by ID

### Categories

- `GET /api/categories`: Get all categories
- `GET /api/categories/:id`: Get category by ID
- `POST /api/categories`: Create a new category
- `PUT /api/categories/:id`: Update category by ID
- `DELETE /api/categories/:id`: Delete category by ID

### Favorite Products

- `POST /api/favoriteProduct`: Add a product to favorites
- `DELETE /api/favoriteProduct`: Remove a product from favorites

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Different permissions for different user roles
- **Rate Limiting**: Prevent brute force attacks
- **Data Sanitization**: Protect against NoSQL injection and XSS attacks
- **HTTP Parameter Pollution Protection**: Prevent parameter pollution attacks
- **Security Headers**: Set security headers with Helmet
- **CORS**: Configure Cross-Origin Resource Sharing

## License

This project is licensed under the MIT License - see the LICENSE file for details. 