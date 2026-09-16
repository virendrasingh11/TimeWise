const Task = require("../models/Task");
const Joi = require("joi");

const taskSchemaValidator = Joi.object({
    title: Joi.string().min(1).max(100).required(),
    category: Joi.string().allow(""),
    estimatedTime: Joi.number().min(1).required(),
    priority: Joi.string().valid("low", "medium", "high")
});

const getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

const getTaskById = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }
        res.json(task);
    } catch (error) {
        next(error);
    }
};

const createTask = async (req, res, next) => {
    try {
        const { title, category, estimatedTime, priority } = req.body;
        
        const task = await Task.create({
            user: req.user._id,
            title,
            category: category || "General",
            estimatedTime,
            priority: priority || "medium"
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }

        const { title, category, estimatedTime, timeSpent, completed, priority } = req.body;

        task.title = title !== undefined ? title : task.title;
        task.category = category !== undefined ? category : task.category;
        task.estimatedTime = estimatedTime !== undefined ? estimatedTime : task.estimatedTime;
        task.timeSpent = timeSpent !== undefined ? timeSpent : task.timeSpent;
        task.completed = completed !== undefined ? completed : task.completed;
        task.priority = priority !== undefined ? priority : task.priority;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (error) {
        next(error);
    }
};

const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!task) {
            res.status(404);
            throw new Error("Task not found");
        }
        
        await Task.deleteOne({ _id: task._id });
        res.status(204).json({ message: "Task removed" });
    } catch (error) {
        next(error);
    }
};

const getDashboardStats = async (req, res, next) => {
    try {
        // Aggregation Pipeline Implementation
        const stats = await Task.aggregate([
            { $match: { user: req.user._id } },
            { 
                $group: {
                    _id: null,
                    totalTasks: { $sum: 1 },
                    completedTasks: {
                        $sum: { $cond: [{ $eq: ["$completed", true] }, 1, 0] }
                    },
                    totalTimeSpent: { $sum: "$timeSpent" },
                    totalEstimatedTime: { $sum: "$estimatedTime" }
                }
            }
        ]);
        
        // Category breakdown
        const categoryBreakdown = await Task.aggregate([
            { $match: { user: req.user._id } },
            {
                $group: {
                    _id: "$category",
                    count: { $sum: 1 },
                    timeSpent: { $sum: "$timeSpent" }
                }
            }
        ]);

        if (stats.length === 0) {
            return res.json({
                totalTasks: 0,
                completedTasks: 0,
                totalTimeSpent: 0,
                totalEstimatedTime: 0,
                categoryBreakdown: []
            });
        }

        res.json({
            ...stats[0],
            categoryBreakdown
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getDashboardStats,
    taskSchemaValidator
};
