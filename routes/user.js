// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const userController = require("../contollers/user");
const { protect } = require("../middleware/authMiddleware");

// Create User
router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);

// Get All Users
router.get("/users", userController.getAllUsers);

// Get User by ID
router.get("/user", protect, userController.getUserById);

// Delete User by ID
router.delete("/users/:id", userController.deleteUserById);

// Update User by ID
router.put("/users/:id", userController.updateUserById);

module.exports = router;
