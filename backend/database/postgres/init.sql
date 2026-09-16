-- Relational schema design with PK/FK
CREATE TABLE Users (
    id SERIAL PRIMARY KEY, -- Primary Key
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL, -- Foreign Key
    task_category VARCHAR(100),
    duration_min INTEGER,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES Users(id)
      ON DELETE CASCADE
);

-- SQL JOINs
-- Query to get all sessions with user details using an INNER JOIN
SELECT 
    Users.name, 
    Users.email, 
    Sessions.task_category, 
    Sessions.duration_min
FROM 
    Sessions
INNER JOIN 
    Users ON Sessions.user_id = Users.id
WHERE 
    Sessions.duration_min > 30;
