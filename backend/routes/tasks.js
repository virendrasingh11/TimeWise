const express = require("express");
const router = express.Router();
const { 
    getTasks, 
    getTaskById, 
    createTask, 
    updateTask, 
    deleteTask, 
    getDashboardStats,
    taskSchemaValidator
} = require("../controllers/taskController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

// Apply protection to all task routes
router.use(protect);

router.route("/")
    .get(getTasks)
    .post(validate(taskSchemaValidator), createTask);

router.get("/stats", getDashboardStats);

router.route("/:id")
    .get(getTaskById)
    .patch(updateTask)
    .delete(deleteTask);

module.exports = router;