// routes/userRoutes.js
//import express frame
const express = require("express");
//router instance
const router = express.Router();
// Import the user controller module
const userController = require("../contollers/userController");
// Import the protect middleware for authentication
const { protect } = require("../middleware/authMiddleware");

//userRoute to handle  the request and response
/** @desc stands for descritpion */
/**
 * @route POST /api/users
 * @desc register new user
 */
// Create User
router.post("/register", userController.createUser);
/**
 * @route POST /api/login
 * @desc Login an existing user
 */
router.post("/login", userController.loginUser);

/**
 * @route GET /api/users
 * @desc Get all users (protected by JWT middleware)
 */
router.get("/users", userController.getAllUsers);

/**
 * @route GET /api/user
 * @desc Get a user by ID (protected by JWT middleware)
 */
router.get("/user", protect, userController.getUserById);

/**
 * @route DELETE /api/users/:id
 * @desc Delete a user by ID
 */
router.delete("/users/:id", userController.deleteUserById);

/**
 * @route PUT /api/users/:id
 * @desc Update a user by ID
 */
router.put("/users/:id", userController.updateUserById);

// Export the router for use in other parts of the application
module.exports = router;
