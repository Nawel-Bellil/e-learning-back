// controllers/studentController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Function to create a new student
async function createStudent(req, res) {
  const { email, password, name, matricule } = req.body;

  try {
    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    // Create student
    const student = await prisma.student.create({
      data: {
        user: { connect: { id: user.id } },
        matricule,
      },
    });

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during student registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to get all students
async function getAllStudents(req, res) {
  try {
    const students = await prisma.student.findMany();
    res.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to get a student by ID
async function getStudentById(req, res) {
  const id = parseInt(req.params.id);

  try {
    const student = await prisma.student.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to delete a student by ID
async function deleteStudentById(req, res) {
  const id = parseInt(req.params.id);

  try {
    await prisma.student.delete({
      where: { id },
    });

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ message: "Server error" });
  }
}

// Function to update a student by ID
async function updateStudentById(req, res) {
  const id = parseInt(req.params.id);
  const { email, name, matricule } = req.body;

  try {
    const updatedStudent = await prisma.student.update({
      where: { id },
      data: {
        user: { update: { email, name } },
        matricule,
      },
      include: { user: true },
    });

    res.json(updatedStudent);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  deleteStudentById,
  updateStudentById,
};
