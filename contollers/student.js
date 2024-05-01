// controllers/userController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get All Users
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

    const student = await prisma.student.create({
      data: {
        user: { connect: { id: user.id } },
        matricule,
      },
    });

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token, student });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginStudent(req, res) {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    // Respond with token
    res.json({ token, user });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({ error: "Error logging in user" });
  }
}
async function getAllUStudent(req, res) {
  const users = await prisma.student.findMany({
    select: {
      user: true,
      matricule: true,
    },
  });
  res.json(users);
}
async function deleteStudent(req, res) {
  try {
    const user = await prisma.student.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Student not found" });
    }

    await prisma.student.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    // await prisma.student.update({
    //   where: {
    //     id: parseInt(req.params.id),
    //   },
    //   data:{
    //     matricule
    //   }
    // });
    await prisma.user.delete({
      where: {
        id: user.userId,
      },
    });
    // await prisma.user.findUnique({
    //   where: {
    //    id: parseInt(req.params.id),
    //   },
    // });

    return res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  createStudent,
  loginStudent,
  getAllUStudent,
  deleteStudent,
};
