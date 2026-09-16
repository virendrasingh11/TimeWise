# TimeWise - Product Requirements Document

## 1. Project Overview
TimeWise is a personal time management application that helps users create daily activities, track the actual time spent, and evaluate productivity through AI insights and dashboard analytics.

## 2. Problem Statement
Students need a practical way to keep track of what tasks need completing, estimated vs actual time spent, and a way to break down large goals into actionable tasks.

## 3. Main Features
- **Authentication**: Secure login/registration.
- **Task Management**: Create, edit, prioritize, and delete tasks.
- **Time Tracking**: Start/pause/stop timer per task.
- **Dashboard**: Real-time aggregated statistics.
- **AI Task Planner**: Break down goals into tasks using LLM.
- **History**: View completed tasks.

## 4. Technology Requirements
- **Frontend**: React, React Router, Vite, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Atlas) for main data, Postgres (Prisma) for analytical demo module.
- **AI**: Google Gemini SDK.

## 5. Functional Requirements
- **FR-01**: Secure User Registration and Login using JWT.
- **FR-02**: Add/View/Delete Tasks bound to the authenticated user.
- **FR-03**: Track actual time spent dynamically using interval timers.
- **FR-04**: Save tracked time securely to the backend.
- **FR-05**: AI Planner should accept a natural language goal and return structured tasks.
- **FR-06**: Display progress through grouped metrics and categories (MongoDB Aggregation).

## 6. Non-Functional Requirements
- **Security**: Passwords hashed with bcrypt, strict CORS, Rate Limiting, environment variables for secrets.
- **Performance**: Database indexing to ensure fast query resolution.
- **Usability**: Clean, modern, student-built interface avoiding excessive "AI-generated" aesthetics.