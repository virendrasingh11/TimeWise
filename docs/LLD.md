# TimeWise - Low Level Design (LLD)

## 1. Backend Controllers

- `authController.js`: Handles `registerUser`, `loginUser`, `getMe`. Uses `bcryptjs` for hashing passwords. Uses `Joi` for input validation.
- `taskController.js`: Handles `getTasks`, `createTask`, `updateTask`, `deleteTask`, and `getDashboardStats`. Ensures `req.user._id` is checked for all operations so users only see their own tasks.
- `aiController.js`: Handles `generateTaskPlan`. Implements prompt injection defense by strictly defining the system persona and enforcing JSON structure. Tracks tokens for cost monitoring.

## 2. Database Schemas

### MongoDB (Mongoose)
- **User**: `name`, `email` (unique), `password`, `role`.
- **Task**: `user` (ref: User), `title`, `category`, `estimatedTime`, `timeSpent`, `completed`, `priority`.
  - Indexes on `(user, createdAt)` and `(user, completed)` for performance.

### Postgres (Prisma Demo)
- **User**: `id`, `email`, `name`.
- **Session**: `id`, `userId` (FK), `taskCategory`, `durationMin`.
  - Implements 1-to-many relationship and cascading deletes.

## 3. Frontend Components
- `App.jsx`: Router configuration and `AuthProvider` wrapper.
- `AuthContext.jsx`: Global state for the authenticated user and token storage in `localStorage`.
- `api.js`: Axios instance with request interceptors for JWT injection and response interceptors for global 401 handling.
- `Dashboard.jsx`: Calls aggregation routes and displays metrics.
- `Tasks.jsx`: Main task management, houses the `TaskForm`, `TaskCard`, and `Timer`.