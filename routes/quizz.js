// quizzRoutes.js

const express = require("express");
const router = express.Router();
const quizzController = require("../controllers/quizz");

// Create a new quizz for a specific chapter
router.post("/chapters/:chapterId/quizzes", quizz.createQuizz);

// Get all quizzes for a specific chapter
router.get("/chapters/:chapterId/quizzes", quizz.getAllQuizzesForChapter);

module.exports = router;
