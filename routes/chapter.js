const express = require("express");
const router = express.Router();
const chapter = require("../contollers/chapter");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new chapter
router.post("/modules/:moduleId/chapters", chapter.createChapter);

// Route to get all chapters
router.get("/modules/:moduleId/chapters", chapter.getAllChapters);

// Route to get a chapter by ID
router.get("/modules/:moduleId/chapters/:id", chapter.getChapterById);

// Route to delete a chapter by ID
router.delete("/modules/:moduleId/chapters/:id", chapter.deleteChapter);

module.exports = router;