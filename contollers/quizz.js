// quizzController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create quizz associated with a chapter
async function createQuizz(req, res) {
  const { chapterId, questions } = req.body;

  try {
    // Check if the chapter exists
    const existingChapter = await prisma.chapter.findUnique({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!existingChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const quizz = await prisma.quizz.create({
      data: {
        chapterId,
        questions: {
          createMany: {
            data: questions,
          },
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json({ message: "Quizz created successfully", quizz });
  } catch (error) {
    console.error("Error creating quizz:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get all quizzes for a specific chapter
async function getAllQuizzesForChapter(req, res) {
  const chapterId = parseInt(req.params.chapterId);

  try {
    // Check if the chapter exists
    const existingChapter = await prisma.chapter.findUnique({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!existingChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    const quizzes = await prisma.quizz.findMany({
      where: {
        chapterId,
      },
      include: {
        questions: true,
      },
    });

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createQuizz,
  getAllQuizzesForChapter,
};
