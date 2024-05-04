const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create Module
async function createModule(req, res) {
  const { name } = req.body;

  try {
    const module = await prisma.module.create({
      data: {
        name,
      },
    });

    res.status(201).json({ message: "Module created successfully", module });
  } catch (error) {
    console.error("Error creating module:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get All Modules
async function getAlldrinks(req, res) {
  try {
    const modules = await prisma.module.findMany({
      include: {
        chapters: true, // Include chapters details
      },
    });
    res.json(modules);
  } catch (error) {
    console.error("Error fetching modules:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Get Module by ID
async function getModuleById(req, res) {
  const moduleId = parseInt(req.params.id);

  try {
    const module = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
      include: {
        chapters: true, // Include chapters details
      },
    });

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    res.status(200).json({ module });
  } catch (error) {
    console.error("Error fetching module:", error);
    res.status(500).json({ error: "Server error" });
  }
}

// Delete Module by ID
async function deleteModule(req, res) {
  const moduleId = parseInt(req.params.id);

  try {
    const module = await prisma.module.findUnique({
      where: {
        id: moduleId,
      },
    });

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    await prisma.module.delete({
      where: {
        id: moduleId,
      },
    });

    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    console.error("Error deleting module:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = {
  createModule,
  getAllModules,
  getModuleById,
  deleteModule,
};
