const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create topic associated with a chapter
async function createTopic(req, res) {
  const { title, chapterId } = req.body;

  try {
    // Check if the module exists
    const existingModule = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!existingModule) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Check if the chapter exists
    const existingChapter = await prisma.chapter.findUnique({
      where: {
        chapter_id: chapterId,
      },
    });

    if (!existingChapter) {
      return res.status(404).json({ error: "Chapter not found" });
    }

    // Get the module ID associated with the chapter
    const moduleId = existingChapter.moduleId;

    const topic = await prisma.topic.create({
      data: {
        title,
        chapter: {
          connect: {
            chapter_id: chapterId,
          },
        },
      },
    });

    res.status(201).json({ message: "Topic created successfully", topic });
  } catch (error) {
    console.error("Error creating topic:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get all topics for a specific chapter
async function getTopics(req, res) {
  const { chapterId } = req.params;

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

    const topics = await prisma.topic.findMany({
      where: {
        chapterId,
      },
    });

    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a topic
async function updateTopic(req, res) {
  const { topicId } = req.params;
  const { title } = req.body;
  try {
    const updatedTopic = await prisma.topic.update({
      where: { id: parseInt(topicId) },
      data: { title },
    });
    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
// Get a single topic by ID
async function getTopicById(req, res) {
  const { chapterId, topicId } = req.params;

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

    const topics = await prisma.topic.findUnique({
      where: {
        chapterId,
        topicId,
      },
    });

    res.status(200).json({ topics });
  } catch (error) {
    console.error("Error fetching topics:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Update a topic
async function updateTopic(req, res) {
  const { topicId } = req.params;
  const { title } = req.body;
  try {
    const updatedTopic = await prisma.topic.update({
      where: { id: parseInt(topicId) },
      data: { title },
    });
    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
// Delete a topic
async function deleteTopic(req, res) {
  const { topicId } = req.params;
  try {
    await prisma.topic.delete({ where: { id: parseInt(topicId) } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createTopic,
  getTopicById,
  getTopics,
  updateTopic,
  deleteTopic,
};