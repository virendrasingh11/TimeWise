# TimeWise - High Level Design

## 1. System Overview

TimeWise is a web-based personal time management application.

The application follows a simple client-server architecture.

The frontend is responsible for the user interface and user interactions.

The backend handles API requests and communicates with the database.

MongoDB is used to store task and time tracking information.

---

## 2. System Architecture

```text
+----------------------+
|    React Frontend    |
|                      |
|  Dashboard           |
|  Tasks               |
|  Timer               |
|  Progress            |
+----------+-----------+
           |
           | HTTP / Axios
           |
+----------v-----------+
|    Express Backend   |
|                      |
|  REST API            |
|  Task Routes         |
|  Business Logic      |
+----------+-----------+
           |
           | Mongoose
           |
+----------v-----------+
|    MongoDB Atlas     |
|                      |
|   Tasks Collection   |
+----------------------+