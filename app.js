//import express frame to build server
//import dependencies
const express = require("express");
const cors = require("cors");
//create instance of express app
const app = express();
//config middleware
require("dotenv").config();
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//define routes
const userRoutes = require("./routes/userRoute");
app.use("/api", userRoutes);
// Mount routes

//starting the server
const PORT = process.env.PORT || 3000; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const { protect } = require("./middleware/authMiddleware");
const userRoutes = require("./routes/userRoute");

// Apply protect middleware to routes that require authentication
app.use("/api/user/profile", protect, userRoutes.profile);
// Error handling middleware for unauthorized requests
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Unauthorized request" });
  } else {
    next(err);
  }
});
