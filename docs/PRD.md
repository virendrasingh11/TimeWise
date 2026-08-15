# TimeWise - Product Requirements Document

## 1. Project Overview

TimeWise is a simple personal time management application.

It helps users create daily activities, estimate the time required for them, track the actual time spent, and mark activities as completed.

The main purpose of the application is to help users understand and manage how they spend their time.

---

## 2. Problem Statement

Students and other users often have multiple activities to complete during the day.

It can be difficult to keep track of:

- What tasks need to be completed
- How much time was planned for each task
- How much time was actually spent
- Which tasks are completed

TimeWise provides a simple solution for managing these activities and tracking time.

---

## 3. Project Objectives

The main objectives of TimeWise are:

- Create and manage daily activities
- Set an estimated time for activities
- Track actual time spent on activities
- Pause and resume time tracking
- Mark activities as completed
- Delete activities
- Display basic daily progress
- Store activity data in MongoDB

---

## 4. Target Users

The main users of TimeWise are:

- Students
- People managing personal tasks
- Users who want to track their daily activities

---

## 5. Main Features

### 5.1 Task Management

Users can:

- Add a new activity
- Enter the activity name
- Select a category
- Set estimated time
- Delete an activity
- Mark an activity as completed

### 5.2 Time Tracking

Users can:

- Start the timer
- Pause the timer
- Resume the timer
- Stop the timer
- Save the tracked time

### 5.3 Dashboard

The dashboard displays:

- Total activities
- Estimated time
- Completed activities
- Actual time tracked
- Daily progress

### 5.4 History

Users can view their recent activities and their current status.

---

## 6. Activity Categories

The application supports basic categories such as:

- Study
- Work
- Fitness
- Personal
- Other

---

## 7. Technology Requirements

### Frontend

- React
- JavaScript
- Axios
- CSS
- Lucide React

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

---

## 8. Functional Requirements

### FR-01: Add Activity

The system should allow the user to create a new activity by providing:

- Activity name
- Category
- Estimated time

### FR-02: View Activities

The system should display activities stored in the database.

### FR-03: Track Time

The system should allow the user to start, pause, resume and stop a timer.

### FR-04: Save Time

When the timer is stopped, the tracked time should be saved to the database.

### FR-05: Complete Activity

The user should be able to mark an activity as completed.

### FR-06: Delete Activity

The user should be able to delete an activity.

### FR-07: Display Progress

The system should calculate and display basic progress information.

---

## 9. Non-Functional Requirements

### Performance

The application should respond quickly for normal usage.

### Usability

The interface should be simple and easy to understand.

### Reliability

Activity data should be stored in MongoDB so that it is not lost when the page is refreshed.

### Security

Database credentials should be stored in environment variables and should not be uploaded to GitHub.

---

## 10. Future Improvements

The project can be improved in the future by adding:

- User authentication
- Multiple user accounts
- Better analytics
- Weekly and monthly reports
- Calendar integration
- Mobile application
- Reminder notifications

---

## 11. Project Scope

The current version focuses on basic personal time management.

The project intentionally keeps the functionality simple so that the main features are easy to use and understand.