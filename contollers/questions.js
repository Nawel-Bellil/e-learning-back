const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create Question
async function createQuestion(req, res) {
  const { type, content, quizzId } = req.body;

  try {
    if (!type || !content || !quizzId) {
      return res.status(400).json({ error: 'Type, content, and quizzId are required in the request body' });
    }

    const question = await prisma.question.create({
      data: {
        type,
        content,
        quizzId: parseInt(quizzId),
      },
    });

    res.status(201).json({ message: 'Question created successfully', question });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get All Questions
async function getAllQuestions(req, res) {
  try {
    const questions = await prisma.question.findMany({
      include: {
        answers: true, // Include answers details
        quizz: true, // Include quizz details
      },
    });
    res.json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Get Question by ID
async function getQuestionById(req, res) {
  const questionId = parseInt(req.params.id);

  try {
    const question = await prisma.question.findUnique({
      where: {
        question_id: questionId,
      },
      include: {
        answers: true, // Include answers details
        quizz: true, // Include quizz details
      },
    });

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.status(200).json({ question });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Update Question by ID
async function updateQuestion(req, res) {
  const questionId = parseInt(req.params.id);
  const { type, content } = req.body;

  try {
    const question = await prisma.question.update({
      where: {
        question_id: questionId,
      },
      data: {
        type,
        content,
      },
    });

    res.json({ message: 'Question updated successfully', question });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

// Delete Question by ID
async function deleteQuestion(req, res) {
  const questionId = parseInt(req.params.id);

  try {
    await prisma.question.delete({
      where: {
        question_id: questionId,
      },
    });

    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ error: 'Server error' });
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
};
