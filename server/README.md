# Backend API Documentation

## Overview

This is a scalable Node.js/Express backend with JWT authentication, MongoDB database, and comprehensive logging.

## Tech Stack

- Node.js & Express.js
- MongoDB & Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Winston for logging
- Express Validator for input validation

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-app
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
```

3. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User Profile

- `PUT /api/users/profile` - Update user profile (protected)
- `DELETE /api/users/account` - Delete user account (protected)

### Tasks

- `GET /api/tasks` - Get all tasks with filtering and search (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Query Parameters for Tasks

- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in title and description
- `sortBy` - Sort field (default: createdAt)
- `order` - Sort order (asc, desc)

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Input validation and sanitization
- Error handling and logging
- Protected routes with middleware

## Logging

All logs are stored in the `logs/` directory:

- `combined.log` - All logs
- `error.log` - Error logs only

## Scalability Considerations

- Modular architecture with separation of concerns
- Middleware-based request processing
- Database indexing for optimized queries
- Stateless authentication with JWT
- Comprehensive error handling
- Structured logging for monitoring
