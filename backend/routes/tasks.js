const express = require("express");
const router = express.Router();

const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });

        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get tasks"
        });
    }
});

// ADD a new task
router.post("/", async (req, res) => {
    try {
        const { title, category, estimatedTime } = req.body;

        const task = await Task.create({
            title,
            category,
            estimatedTime
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create task"
        });
    }
});

// MARK task as completed
router.patch("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { completed: true },
            { new: true }
        );

        res.json(task);
    } catch (error) {
        res.status(500).json({
            message: "Failed to update task"
        });
    }
});

// DELETE task
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete task"
        });
    }
});
// Update time spent
router.patch("/:id/time", async (req, res) => {
  try {
    const { timeSpent } = req.body;

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { timeSpent },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.json(task);

  } catch (error) {
    res.status(500).json({
      message: "Error updating time",
      error: error.message
    });
  }
});

module.exports = router;