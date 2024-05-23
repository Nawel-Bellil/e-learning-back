// controllers/userController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get All Users
async function createUser(req, res) {
  const { email, password, first_name, last_name } = req.body;

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
        first_name,
        last_name,
        
      },
    });

    // Create token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Server error" });
  }
}

async function loginUser(req, res) {
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
async function getAllUsers(req, res) {
  const users = await prisma.user.findMany();
  res.json(users);
}

// Get User by ID
async function getUserById(req, res) {
  const id = parseInt(req.user.id);
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      posts: true,
      profile: true,
      Story: true,
      email: true,
    },
  });
  res.status(200).send({ msg: "good", user });
}

// Delete User by ID
async function deleteUserById(req, res) {
  const id = parseInt(req.params.id);
  const user = await prisma.user.delete({
    where: {
      id: id,
    },
  });
  res.json({ message: "User deleted successfully" });
}

// Update User by ID
async function updateUserById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).send("Invalid user ID.");
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
      },
    });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).send("User not found.");
    }
    res.status(500).send("An error occurred while updating the user.");
  }
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  loginUser,
};