const express = require("express");
const router = express.Router();
const quizzController = require("../controllers/quizz");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new quizz for a specific chapter within a module
router.post("/modules/:moduleId/chapters/:chapterId/quizzes", protect, quizzController.createQuizz);

// Route to get all quizzes within a specific module and chapter
router.get("/modules/:moduleId/chapters/:chapterId/quizzes", protect, quizzController.getAllQuizzes);

// Route to get a quizz by ID within a specific module and chapter
router.get("/modules/:moduleId/chapters/:chapterId/quizzes/:id", protect, quizzController.getQuizzById);

// Route to delete a quizz by ID within a specific module and chapter
router.delete("/modules/:moduleId/chapters/:chapterId/quizzes/:id", protect, quizzController.deleteQuizz);

module.exports = router;
