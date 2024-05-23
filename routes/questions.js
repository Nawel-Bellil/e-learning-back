const express = require("express");
const router = express.Router();
const questions = require("../contollers/questions.js");

// Create a question
router.post("/", questions.createQuestion);

// Get all questions
router.get("/", questions.getAllQuestions);

// Get a question by ID
router.get("/:id", questions.getQuestionById);

// Update a question by ID
router.put("/:id", questions.updateQuestion);

// Delete a question by ID
router.delete("/:id", questions.deleteQuestion);

module.exports = router;