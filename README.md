# TimeWise

A student-built productivity and time-management application demonstrating full-stack JavaScript, React, Express, MongoDB, and modern AI integrations.

## Features
- **Task Management**: Create, edit, and track tasks.
- **Timer**: Built-in time tracking per task.
- **Dashboard**: Real-time aggregated statistics (MongoDB Aggregation).
- **AI Task Planner**: Uses Google Gemini to break down goals into sub-tasks securely.
- **Security**: JWT Authentication, password hashing, and rate limiting.

## Tech Stack
- **Frontend**: React, Vite, React Router, Axios, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose), Postgres (Prisma) for analytical demo module
- **AI**: Google Generative AI (Gemini)

## Setup Instructions

### 1. Environment Variables
Copy `.env.example` to `.env` in both `frontend/` and `backend/` and fill in the values.
- `MONGODB_URI`: Your MongoDB connection string.
- `JWT_SECRET`: Any random string for signing tokens.
- `LLM_API_KEY`: Google Gemini API Key.

### 2. Backend
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4. Relational Database Demo (Prisma/Postgres)
To run the SQL/relational concepts demonstration:
```bash
cd backend
npm install @prisma/client
npx prisma db push --schema=database/postgres/schema.prisma
npx prisma generate --schema=database/postgres/schema.prisma
node database/postgres/demo.js
```

## Deployment
- **Frontend (Vercel)**: Connect your GitHub repo to Vercel. Ensure `VITE_API_URL` is set to your deployed backend URL in the Vercel dashboard. The build command is `npm run build` and the output directory is `dist`.
- **Backend (Render)**: Create a new Web Service on Render, connect the repo, set root directory to `backend`, build command `npm install`, start command `npm start`. Add all environment variables from `.env`.

## Architecture and Concepts
Please refer to the `docs/` folder for HLD, LLD, PRD, and `CONCEPTS.md` which maps the assessor concepts to code implementations for viva preparation.