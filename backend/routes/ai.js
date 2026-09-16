const express = require("express");
const { generateTaskPlan, aiRequestSchema } = require("../controllers/aiController");
const { protect } = require("../middleware/auth");
const validate = require("../middleware/validate");

const router = express.Router();

router.post("/planner", protect, validate(aiRequestSchema), generateTaskPlan);

module.exports = router;
