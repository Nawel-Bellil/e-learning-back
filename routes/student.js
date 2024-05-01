// routes/userRoutes.js
//import express frame
const express = require("express");
//router instance
const router = express.Router();
// Import the user controller module
const userController = require("../contollers/student");
// Import the protect middleware for authentication
const { protect } = require("../middleware/authMiddleware");

//userRoute to handle  the request and response
/** @desc stands for descritpion */
/**
 * @route POST /api/users
 * @desc register new user
 */
// Create User
router.post("/register", userController.createStudent);
/**
 * @route POST /api/login
 * @desc Login an existing user
 */
router.post("/login", userController.loginStudent);

/**students
 * @route GET /api/users
 * @desc Get all users (protected by JWT middleware)
 */
router.get("/students", userController.getAllUStudent);
router.get("/students/:id", userController.getAllUStudent);
router.delete("//:id", userController.deleteStudent);

/**
 * @route GET /api/user
 * @desc Get a user by ID (protected by JWT middleware)
 */
module.exports = router;
