# Scalable Web App with Authentication & Dashboard

A full-stack web application featuring JWT authentication, task management, and a modern responsive UI with dark mode support.

## Tech Stack

### Frontend

- React.js with TypeScript
- Tailwind CSS for styling
- React Router for navigation
- Axios for API calls
- Lucide React for icons
- Vite for build tooling

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Bcrypt for password hashing
- Winston for logging
- Express Validator for input validation

## Features

### Authentication

- User registration and login with JWT
- Password hashing with bcrypt
- Protected routes requiring authentication
- Persistent sessions with localStorage

### Task Management

- Create, Read, Update, Delete (CRUD) operations
- Task filtering by status and priority
- Search functionality
- Sortable task lists
- Task statistics dashboard

### User Interface

- Responsive design for all screen sizes
- Dark/Light mode toggle
- Modern, clean, and intuitive UI
- Smooth animations and transitions
- Mobile-friendly sidebar navigation

### Security

- JWT-based authentication
- Password hashing
- Input validation (client and server)
- Protected API endpoints
- Secure HTTP-only practices

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/scalable-app
JWT_SECRET=your_jwt_secret_key_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the project root directory

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
.
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validationMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── taskRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── logger.js
│   └── server.js
├── client/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── TaskModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── ThemeContext.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Tasks.jsx
│   │   ├── Profile.jsx
│   │   └── Settings.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── README.md
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### User

- `PUT /api/users/profile` - Update user profile (protected)
- `DELETE /api/users/account` - Delete user account (protected)

### Tasks

- `GET /api/tasks` - Get all user tasks with filters (protected)
- `GET /api/tasks/stats` - Get task statistics (protected)
- `GET /api/tasks/:id` - Get single task (protected)
- `POST /api/tasks` - Create new task (protected)
- `PUT /api/tasks/:id` - Update task (protected)
- `DELETE /api/tasks/:id` - Delete task (protected)

## Scalability Considerations

### Frontend

- Modular component architecture for reusability
- Context API for state management (can be migrated to Redux/Zustand for larger apps)
- Code splitting with React.lazy and Suspense
- Optimized build with Vite
- Responsive design for all devices

### Backend

- RESTful API design following best practices
- Middleware-based architecture for scalability
- Database indexing for optimized queries
- Stateless JWT authentication for horizontal scaling
- Structured logging with Winston
- Input validation and sanitization
- Error handling middleware
- Separation of concerns (MVC pattern)

### Database

- MongoDB for flexible schema design
- Indexed fields for faster queries
- Aggregation pipeline for complex operations
- Can be easily migrated to sharded clusters for high traffic

### Future Enhancements

- Implement Redis for caching and session management
- Add rate limiting for API protection
- Implement WebSocket for real-time updates
- Add pagination for large datasets
- Implement CDN for static assets
- Add comprehensive testing (unit, integration, e2e)
- Implement CI/CD pipeline
- Add monitoring and alerting (e.g., Sentry, DataDog)
- Implement microservices architecture for specific modules

## License

This project is created for educational purposes.
