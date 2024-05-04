const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapter");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new chapter
router.post("/chapters", protect, chapter.createChapter);

// Route to get all chapters
router.get("/chapters", protect, chapter.getAllChapters);

// Route to get a chapter by ID
router.get("/chapters/:id", protect, chapter.getChapterById);

// Route to delete a chapter by ID
router.delete("/chapters/:id", protect, chapter.deleteChapter);

chapter.exports = router;
