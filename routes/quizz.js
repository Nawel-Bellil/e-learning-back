const express = require("express");
const router = express.Router();
const quizz = require("../contollers/quizz");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new quizz for a specific chapter within a module
router.post(
  "/modules/:moduleId/chapters/:chapterId/quizzes",
  protect,
  quizz.createQuizz
);

// Route to get all quizzes within a specific module and chapter
router.get(
  "/modules/:moduleId/chapters/:chapterId/quizzes",
  protect,
  quizz.getAllQuizzes
);

// Route to get a quizz by ID within a specific module and chapter
router.get(
  "/modules/:moduleId/chapters/:chapterId/quizzes/:id",
  protect,
  quizz.getQuizzById
);

// Route to delete a quizz by ID within a specific module and chapter
router.delete(
  "/modules/:moduleId/chapters/:chapterId/quizzes/:id",
  protect,
  quizz.deleteQuizz
);

module.exports = router;