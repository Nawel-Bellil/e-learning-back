// routes/student.js
//import express frame
const express = require("express");
//router instance
const router = express.Router();
// Import the student controller module
const student = require("../contollers/student");
// Import the protect middleware for authentication
const { protect } = require("../middleware/authMiddleware");

//student to handle  the request and response
/** @desc stands for descritpion */
/**
 * @route POST /api/student/register
 * @desc register new student
 */
// Create student
router.post("/register", student.createStudent);
/**
 * @route POST /api/login
 * @desc Login an existing student
 */
router.post("/login", student.loginStudent);

/**
 * @route GET /api/student/students
 * @desc Get all students (protected by JWT middleware)
 */
router.get("/students", protect, student.getAllUStudent);

/**
 * @route GET /api/student/:id
 * @desc Get a student by ID (protected by JWT middleware)
 */
router.get("/student/:id", protect, student.getStudentById);

/**
 * @route DELETE /api/students/:id
 * @desc Delete a student by ID
 */
router.delete("/students/:id", student.deleteStudent);

/**
 * @route PUT /api/students/:id
 * @desc Update a student by ID
 */
router.put("/students/:id", student.updateStudent);

// Export the router for use in other parts of the application
module.exports = router;
