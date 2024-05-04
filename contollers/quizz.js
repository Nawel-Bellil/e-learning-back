const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create a new quizz
async function createQuizz(req, res) {
  const { chapterId, questions } = req.body;

  try {
    const quizz = await prisma.quizz.create({
      data: {
        chapterId,
        questions: {
          create: questions, // Assuming questions is an array of objects containing question details
        },
      },
      include: {
        questions: true, // Include the questions in the response
      },
    });

    res.status(201).json({ message: "Quizz created successfully", quizz });
  } catch (error) {
    console.error("Error creating quizz:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get all quizzes
async function getAllQuizzes(req, res) {
  try {
    const quizzes = await prisma.quizz.findMany({
      include: {
        questions: true, // Include the questions in the response
      },
    });
    res.json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get a quizz by ID
async function getQuizzById(req, res) {
  const quizzId = parseInt(req.params.id);

  try {
    const quizz = await prisma.quizz.findUnique({
      where: {
        quizz_id: quizzId,
      },
      include: {
        questions: true, // Include the questions in the response
      },
    });

    if (!quizz) {
      return res.status(404).json({ error: "Quizz not found" });
    }

    res.status(200).json({ quizz });
  } catch (error) {
    console.error("Error fetching quizz:", error);
    res.status(500).json({ error: "Failed to fetch quizz" });
  }
}

// Delete a quizz by ID
async function deleteQuizz(req, res) {
  const quizzId = parseInt(req.params.id);

  try {
    const quizz = await prisma.quizz.findUnique({
      where: {
        quizz_id: quizzId,
      },
    });

    if (!quizz) {
      return res.status(404).json({ error: "Quizz not found" });
    }

    await prisma.quizz.delete({
      where: {
        quizz_id: quizzId,
      },
    });

    res.status(200).json({ message: "Quizz deleted successfully" });
  } catch (error) {
    console.error("Error deleting quizz:", error);
    res.status(500).json({ error: "Failed to delete quizz" });
  }
}

module.exports = {
  createQuizz,
  getAllQuizzes,
  getQuizzById,
  deleteQuizz,
};
