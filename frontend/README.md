# E-Commerce Frontend

A modern React-based e-commerce frontend application built with Material UI, Redux Toolkit, and React Router.

## Features

- **User Authentication**

  - Login/Register functionality
  - JWT token-based authentication
  - Protected routes
  - Password reset functionality

- **Product Management**

  - Browse products with pagination
  - Filter products by category
  - Search products
  - View product details
  - Add products to favorites

- **User Profile**

  - View and edit profile information
  - Manage favorite products
  - View order history

- **Admin Dashboard**

  - Manage products (CRUD operations)
  - Manage categories
  - User management
  - View analytics and statistics

- **Responsive Design**
  - Mobile-first approach
  - Consistent UI across devices
  - Material UI components

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and development server
- **Material UI** - Component library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **JWT** - Authentication

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create environment files:

   - Copy `.env.example` to `.env.development` for development
   - Copy `.env.example` to `.env.production` for production
   - Update the environment variables as needed

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Build for production:
   ```bash
   npm run build
   # or
   yarn build
   ```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, fonts, etc.
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout components
│   ├── pages/           # Page components
│   │   ├── auth/        # Authentication pages
│   │   ├── admin/       # Admin dashboard pages
│   │   └── ...          # Other pages
│   ├── services/        # API services
│   ├── store/           # Redux store
│   │   └── slices/      # Redux slices
│   ├── utils/           # Utility functions
│   ├── App.jsx          # Main App component
│   └── main.jsx         # Entry point
├── .env.development     # Development environment variables
├── .env.production      # Production environment variables
├── index.html           # HTML template
├── package.json         # Dependencies and scripts
└── vite.config.js       # Vite configuration
```

## File Naming Convention

This project uses the `.jsx` extension for all React-related files, including:

- Components
- Hooks
- Redux slices
- Utility functions
- Services

This convention helps maintain consistency and makes it clear which files contain React code.

## API Integration

The frontend communicates with the backend API using Axios. The API service is configured in `src/services/api.jsx` and includes:

- Base URL configuration
- Request/response interceptors
- Authentication token management
- Error handling

## State Management

The application uses Redux Toolkit for state management with the following slices:

- `authSlice.jsx` - Authentication state
- `userSlice.jsx` - User profile state
- `productSlice.jsx` - Product-related state

## Routing

The application uses React Router for navigation with the following routes:

- Public routes (Home, Login, Register, etc.)
- Protected routes (Profile, Favorites, etc.)
- Admin routes (Dashboard, Product Management, etc.)

## Error Handling

The application includes comprehensive error handling:

- API error handling with Axios interceptors
- Form validation errors
- Global error boundary
- Toast notifications for user feedback

## Testing

To run tests:

```bash
npm run test
# or
yarn test
```

## Deployment

The application can be deployed to any static hosting service:

1. Build the application:

   ```bash
   npm run build
   # or
   yarn build
   ```

2. Deploy the `dist` directory to your hosting service.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
