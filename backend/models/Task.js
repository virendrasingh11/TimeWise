const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            default: "General",
            trim: true
        },
        estimatedTime: {
            type: Number,
            required: true,
            min: 1
        },
        timeSpent: {
            type: Number,
            default: 0,
            min: 0
        },
        completed: {
            type: Boolean,
            default: false
        },
        priority: {
            type: String,
            enum: ["low", "medium", "high"],
            default: "medium"
        }
    },
    {
        timestamps: true
    }
);

// Indexing for query performance
taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, completed: 1 });
taskSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model("Task", taskSchema);
