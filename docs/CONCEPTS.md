# Implementation of Assessor Concepts

This document maps the requested Kalvium concepts to their implementation in the TimeWise codebase.

| Concept | File Location | Implementation Details | How to explain in viva |
|---------|--------------|------------------------|------------------------|
| **JS - Event Loop** | `frontend/src/components/Timer.jsx` | `setInterval` callback running asynchronously while UI remains responsive. | Explain that JS is single-threaded, and `setInterval` uses the Web APIs to queue callbacks in the task queue, allowing the main thread (React render) to continue. |
| **JS - Promises vs Callbacks** | `frontend/src/utils/api.js` | Axios interceptors return `Promise.reject(error)` allowing chaining instead of passing error callbacks. | Show how `async/await` and Promises avoid "callback hell" making async HTTP requests readable. |
| **JS - Hoisting** | `backend/middleware/errorHandler.js` | Functions declared with `const` vs `function` demonstrating scoping rules. | Explain that `const/let` are hoisted but not initialized (Temporal Dead Zone), unlike `var` or standard function declarations. |
| **JS - async/await** | `backend/controllers/*.js` | All controllers use `async/await` for database ops. | Explain it as syntactic sugar over Promises, pausing function execution until the Promise resolves. |
| **JS - Closures** | `frontend/src/components/Timer.jsx` | `setTime(time => time + 1)` relies on closure over state updater, preventing stale closure issues. | Explain how the inner function retains access to its lexical scope even when executed later by the interval. |
| **React - Component comp.** | `frontend/src/pages/Tasks.jsx` | Combines `TaskForm`, `TaskCard`, and `Timer`. | Show how UI is broken into smaller reusable pieces rather than one giant file. |
| **React - useState / useEffect**| `frontend/src/pages/Dashboard.jsx` | Fetching stats on mount using `useEffect` and storing in `useState`. | Describe `useState` for local state and `useEffect` for side-effects (fetching data, intervals). |
| **React - Routing** | `frontend/src/App.jsx` | React Router DOM handles `/dashboard`, `/tasks`. | Explain client-side routing avoiding full page reloads. |
| **React - Forms / Validation** | `frontend/src/components/TaskForm.jsx` | Controlled inputs with local validation. | Point out `value={title}` binding and `onChange` handlers preventing invalid empty submissions. |
| **Express - RESTful API** | `backend/routes/tasks.js` | Clean `GET /`, `POST /`, `PATCH /:id`. | Explain representing entities as resources and using correct HTTP verbs. |
| **Express - Middleware** | `backend/middleware/auth.js` | Intercepts requests to verify JWT. | Describe middleware as functions sitting between request and response (parsing, auth, errors). |
| **Express - Error Handling** | `backend/middleware/errorHandler.js`| Central error handler avoiding crashes. | Explain how `next(error)` catches and forwards errors to this final middleware safely. |
| **Security - JWT / Password** | `backend/models/User.js` | `bcryptjs` for hashing, JWT for stateless sessions. | Explain we never store plaintext passwords and JWT signs user data cryptographically. |
| **Security - Rate Limiting** | `backend/server.js` | `express-rate-limit` prevents brute force. | Show the middleware stopping >100 requests per 15 min per IP. |
| **Mongo - CRUD & Modeling** | `backend/models/Task.js` | Mongoose schema with Types. | Explain schema enforcement at the application level. |
| **Mongo - Indexing** | `backend/models/Task.js` | `taskSchema.index({ user: 1, createdAt: -1 })` | Explain how B-Trees speed up queries, preventing full collection scans. |
| **Mongo - Aggregation** | `backend/controllers/taskController.js`| `$match`, `$group` used for dashboard stats. | Explain the pipeline approach for complex data transformations inside the DB. |
| **AI - API Integration** | `backend/controllers/aiController.js` | Google Gemini SDK generating task lists. | Show how the backend acts as a secure proxy to the LLM. |
| **AI - Structured Output** | `backend/controllers/aiController.js` | System prompt enforces JSON schema. | Explain why rigid formatting is needed to parse AI responses into UI components. |
| **SQL - Schema & JOINs** | `backend/database/postgres/demo.js` | Prisma script defining PKs, FKs, and running joins. | Walk through how normalized data requires JOINs, contrary to Mongo's embedded documents. |
