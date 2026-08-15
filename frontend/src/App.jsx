import { useEffect, useState } from "react";
import axios from "axios";

import {
  LayoutDashboard,
  Clock3,
  BarChart3,
  Settings,
  Plus,
  Play,
  Check,
  Trash2,
  Target,
  ListTodo,
  Pause,
  History,
} from "lucide-react";

import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  // =========================
  // STATE
  // =========================

  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Timer states
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Add task form
  const [formData, setFormData] = useState({
    title: "",
    category: "Study",
    estimatedTime: "",
  });

  // =========================
  // GET ALL TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (!timerRunning) {
      return;
    }

    const interval = setInterval(() => {
      setTimerSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timerRunning]);

  // =========================
  // ADD TASK
  // =========================

  const addTask = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Please enter a task name");
      return;
    }

    if (!formData.estimatedTime) {
      alert("Please enter estimated time");
      return;
    }

    try {
      await axios.post(API_URL, {
        title: formData.title.trim(),
        category: formData.category,
        estimatedTime: Number(formData.estimatedTime),
      });

      setFormData({
        title: "",
        category: "Study",
        estimatedTime: "",
      });

      setShowForm(false);

      await fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);

      if (error.response) {
        alert(
          "Server error: " +
            (error.response.data.message || "Could not add task")
        );
      } else {
        alert(
          "Could not connect to backend. Make sure backend is running on port 5000."
        );
      }
    }
  };

  // =========================
  // START TIMER
  // =========================

  const startTimer = (task) => {
    // Resume current task
    if (activeTaskId === task._id) {
      setTimerRunning(true);
      return;
    }

    // Start new task
    setActiveTaskId(task._id);

    // Continue from previously saved time
    setTimerSeconds(task.timeSpent || 0);

    setTimerRunning(true);
  };

  // =========================
  // PAUSE TIMER
  // =========================

  const pauseTimer = () => {
    setTimerRunning(false);
  };

  // =========================
  // STOP TIMER
  // =========================

  const stopTimer = async () => {
    if (!activeTaskId) {
      return;
    }

    try {
      await axios.patch(`${API_URL}/${activeTaskId}/time`, {
        timeSpent: timerSeconds,
      });

      setTimerRunning(false);
      setActiveTaskId(null);
      setTimerSeconds(0);

      await fetchTasks();

      alert("Time saved successfully! ⏱️");
    } catch (error) {
      console.error("Error saving time:", error);

      alert("Could not save tracked time.");
    }
  };

  // =========================
  // MARK TASK COMPLETED
  // =========================

  const completeTask = async (id) => {
    // Don't allow completing the currently running task
    if (activeTaskId === id) {
      alert("Please stop the timer before completing the task.");
      return;
    }

    try {
      await axios.patch(`${API_URL}/${id}`);

      await fetchTasks();
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {
    // Don't delete active task
    if (activeTaskId === id) {
      alert("Please stop the timer before deleting this task.");
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`);

      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // =========================
  // FORMAT TIME
  // =========================

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);

    const minutes = Math.floor((seconds % 3600) / 60);

    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  // =========================
  // STATISTICS
  // =========================

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // Total estimated time in minutes
  const totalEstimatedTime = tasks.reduce(
    (total, task) => total + (task.estimatedTime || 0),
    0
  );

  // Total actual tracked time in seconds
  const totalTrackedSeconds = tasks.reduce(
    (total, task) => total + (task.timeSpent || 0),
    0
  );

  // Completion percentage
  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  // =========================
  // DAILY GOAL
  // =========================

  const dailyGoalSeconds = 4 * 60 * 60;

  const goalProgress = Math.min(
    100,
    Math.round((totalTrackedSeconds / dailyGoalSeconds) * 100)
  );

  // =========================
  // RECENT HISTORY
  // =========================

  const recentHistory = [...tasks]
    .sort((a, b) => {
      return (
        new Date(b.updatedAt || b.createdAt) -
        new Date(a.updatedAt || a.createdAt)
      );
    })
    .slice(0, 5);

  // =========================
  // TASK STATUS
  // =========================

  const getTaskStatus = (task) => {
    if (task.completed) {
      return "Completed";
    }

    if (activeTaskId === task._id) {
      return "In Progress";
    }

    if (task.timeSpent > 0) {
      return "Paused";
    }

    return "Pending";
  };

  // =========================
  // STATUS STYLE
  // =========================

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return {
        background: "#dcfce7",
        color: "#166534",
      };
    }

    if (status === "In Progress") {
      return {
        background: "#dbeafe",
        color: "#1d4ed8",
      };
    }

    if (status === "Paused") {
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
    }

    return {
      background: "#f3f4f6",
      color: "#4b5563",
    };
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            <Clock3 size={22} />
          </div>

          <span>
            TimeWise
          </span>

        </div>

        <nav>

          <button className="nav-item active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button className="nav-item">
            <ListTodo size={19} />
            Tasks
          </button>

          <button className="nav-item">
            <BarChart3 size={19} />
            History
          </button>

          <button className="nav-item">
            <Settings size={19} />
            Settings
          </button>

        </nav>

        <div className="sidebar-bottom">

          <div className="goal-box">

            <Target size={20} />

            <div>

              <strong>
                Daily Goal
              </strong>

              <span>
                4 hours
              </span>

            </div>

          </div>

        </div>

      </aside>

      {/* =========================
          MAIN
      ========================= */}

      <main className="main">

        {/* HEADER */}

        <header className="topbar">

          <div>

            <p className="date">
              PERSONAL TIME MANAGER
            </p>

            <h1>
              Good afternoon 👋
            </h1>

            <p className="subtitle">
              Let's make your time count today.
            </p>

          </div>

          <div className="profile">

            <div className="avatar">
              V
            </div>

            <div>

              <strong>
                Virendra
              </strong>

              <span>
                Productive mode
              </span>

            </div>

          </div>

        </header>

        {/* =========================
            STATISTICS
        ========================= */}

        <section className="stats">

          {/* Estimated Time */}

          <div className="stat-card purple">

            <div className="stat-icon">
              <Clock3 size={21} />
            </div>

            <div>

              <span>
                Estimated Time
              </span>

              <h2>
                {Math.floor(totalEstimatedTime / 60)}h{" "}
                {totalEstimatedTime % 60}m
              </h2>

              <small>
                Planned today
              </small>

            </div>

          </div>

          {/* Total Tasks */}

          <div className="stat-card blue">

            <div className="stat-icon">
              <ListTodo size={21} />
            </div>

            <div>

              <span>
                Total Tasks
              </span>

              <h2>
                {tasks.length}
              </h2>

              <small>
                Activities planned
              </small>

            </div>

          </div>

          {/* Completed */}

          <div className="stat-card green">

            <div className="stat-icon">
              <Check size={21} />
            </div>

            <div>

              <span>
                Completed
              </span>

              <h2>
                {completedTasks}
              </h2>

              <small>
                {progress}% completion rate
              </small>

            </div>

          </div>

        </section>

        {/* =========================
            TRACKED TIME
        ========================= */}

        <section
          className="progress-card"
          style={{ marginBottom: "20px" }}
        >

          <div className="progress-header">

            <div>

              <h3>
                Actual Time Tracked
              </h3>

              <p>
                Time recorded using the timer.
              </p>

            </div>

            <strong>
              {formatTime(totalTrackedSeconds)}
            </strong>

          </div>

        </section>

        {/* =========================
            TODAY'S PROGRESS
        ========================= */}

        <section className="progress-card">

          <div className="progress-header">

            <div>

              <h3>
                Today's Progress
              </h3>

              <p>
                Keep going, you're doing great!
              </p>

            </div>

            <strong>
              {progress}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </section>

        {/* =========================
            DAILY GOAL
        ========================= */}

        <section
          className="progress-card"
          style={{ marginTop: "20px" }}
        >

          <div className="progress-header">

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >

              <Target size={20} />

              <div>

                <h3>
                  Daily 4-Hour Goal
                </h3>

                <p>
                  Track focused time toward your daily target.
                </p>

              </div>

            </div>

            <strong>
              {goalProgress}%
            </strong>

          </div>

          <div className="progress-bar">

            <div
              className="progress-fill"
              style={{
                width: `${goalProgress}%`,
              }}
            />

          </div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "13px",
              opacity: 0.7,
            }}
          >
            {formatTime(totalTrackedSeconds)} tracked of 04:00:00 goal
          </div>

        </section>

        {/* =========================
            TASKS
        ========================= */}

        <section className="tasks-section">

          <div className="section-header">

            <div>

              <h2>
                Today's Activities
              </h2>

              <p>
                Manage your time and stay focused.
              </p>

            </div>

            <button
              className="add-button"
              onClick={() => setShowForm(true)}
            >

              <Plus size={19} />

              Add Task

            </button>

          </div>

          <div className="task-list">

            {/* NO TASKS */}

            {tasks.length === 0 ? (

              <div className="empty">

                <ListTodo size={40} />

                <h3>
                  No tasks yet
                </h3>

                <p>
                  Add your first activity to get started.
                </p>

              </div>

            ) : (

              /* TASK LIST */

              tasks.map((task) => (

                <div
                  className={`task-card ${
                    task.completed ? "completed" : ""
                  }`}
                  key={task._id}
                >

                  {/* TASK INFORMATION */}

                  <div className="task-left">

                    <div className="task-dot" />

                    <div>

                      <h3>
                        {task.title}
                      </h3>

                      <div className="task-meta">

                        <span>
                          {task.category}
                        </span>

                        <span>
                          •
                        </span>

                        <span>
                          {task.estimatedTime} min
                        </span>

                      </div>

                      {/* SAVED TIME */}

                      {task.timeSpent > 0 && (

                        <div
                          style={{
                            marginTop: "6px",
                            fontSize: "13px",
                            opacity: 0.75,
                          }}
                        >

                          ⏱️ Tracked:{" "}

                          {formatTime(task.timeSpent)}

                        </div>

                      )}

                    </div>

                  </div>

                  {/* TASK ACTIONS */}

                  <div className="task-actions">

                    {/* NORMAL TASK */}

                    {!task.completed &&
                      activeTaskId !== task._id && (

                        <button
                          className="start-btn"
                          onClick={() =>
                            startTimer(task)
                          }
                        >

                          <Play size={15} />

                          Start

                        </button>

                    )}

                    {/* ACTIVE TIMER */}

                    {activeTaskId === task._id && (

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >

                        {/* TIMER */}

                        <span
                          style={{
                            fontWeight: "700",
                            fontSize: "15px",
                            minWidth: "90px",
                            textAlign: "center",
                          }}
                        >

                          {formatTime(timerSeconds)}

                        </span>

                        {/* PAUSE */}

                        {timerRunning ? (

                          <button
                            className="start-btn"
                            onClick={pauseTimer}
                          >

                            <Pause size={15} />

                            Pause

                          </button>

                        ) : (

                          /* RESUME */

                          <button
                            className="start-btn"
                            onClick={() =>
                              startTimer(task)
                            }
                          >

                            <Play size={15} />

                            Resume

                          </button>

                        )}

                        {/* STOP */}

                        <button
                          className="delete-btn"
                          onClick={stopTimer}
                        >

                          ■ Stop

                        </button>

                      </div>

                    )}

                    {/* COMPLETED */}

                    {task.completed && (

                      <span className="completed-label">

                        <Check size={15} />

                        Completed

                      </span>

                    )}

                    {/* COMPLETE BUTTON */}

                    {!task.completed &&
                      activeTaskId !== task._id && (

                        <button
                          className="start-btn"
                          onClick={() =>
                            completeTask(task._id)
                          }
                        >

                          <Check size={15} />

                          Done

                        </button>

                    )}

                    {/* DELETE */}

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteTask(task._id)
                      }
                    >

                      <Trash2 size={17} />

                    </button>

                  </div>

                </div>

              ))

            )}

          </div>

        </section>

        {/* =========================
            RECENT HISTORY
        ========================= */}

        <section
          className="tasks-section"
          style={{ marginTop: "30px" }}
        >

          <div className="section-header">

            <div>

              <h2
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >

                <History size={22} />

                Recent History

              </h2>

              <p>
                Your latest time-management activities.
              </p>

            </div>

          </div>

          <div className="task-list">

            {recentHistory.length === 0 ? (

              <div className="empty">

                <History size={40} />

                <h3>
                  No history yet
                </h3>

                <p>
                  Your recent activities will appear here.
                </p>

              </div>

            ) : (

              recentHistory.map((task) => {

                const status = getTaskStatus(task);

                const statusStyle =
                  getStatusStyle(status);

                return (

                  <div
                    key={`history-${task._id}`}
                    className="task-card"
                  >

                    <div className="task-left">

                      <div className="task-dot" />

                      <div>

                        <h3>
                          {task.title}
                        </h3>

                        <div className="task-meta">

                          <span>
                            {task.category}
                          </span>

                          <span>
                            •
                          </span>

                          <span>
                            {task.timeSpent > 0
                              ? formatTime(task.timeSpent)
                              : `${task.estimatedTime} min planned`}
                          </span>

                        </div>

                      </div>

                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >

                      <span
                        style={{
                          ...statusStyle,
                          padding: "6px 10px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                );
              })

            )}

          </div>

        </section>

      </main>

      {/* =========================
          ADD TASK MODAL
      ========================= */}

      {showForm && (

        <div
          className="modal-overlay"
          onClick={() =>
            setShowForm(false)
          }
        >

          <div
            className="modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* MODAL HEADER */}

            <div className="modal-header">

              <div>

                <h2>
                  Add New Task
                </h2>

                <p>
                  Plan your next activity.
                </p>

              </div>

              <button
                className="close-btn"
                onClick={() =>
                  setShowForm(false)
                }
              >

                ×

              </button>

            </div>

            {/* FORM */}

            <form onSubmit={addTask}>

              {/* TASK NAME */}

              <label>
                Task Name
              </label>

              <input
                type="text"
                placeholder="e.g. Learn JavaScript"
                value={formData.title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    title: e.target.value,
                  })
                }
              />

              {/* CATEGORY */}

              <label>
                Category
              </label>

              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
              >

                <option value="Study">
                  Study
                </option>

                <option value="Work">
                  Work
                </option>

                <option value="Personal">
                  Personal
                </option>

                <option value="Fitness">
                  Fitness
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

              {/* ESTIMATED TIME */}

              <label>
                Estimated Time (minutes)
              </label>

              <input
                type="number"
                min="1"
                placeholder="60"
                value={formData.estimatedTime}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedTime:
                      e.target.value,
                  })
                }
              />

              {/* SUBMIT */}

              <button
                className="submit-button"
                type="submit"
              >

                <Plus size={18} />

                Add Activity

              </button>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;