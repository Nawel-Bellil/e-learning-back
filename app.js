//import express frame to build server
const express = require("express");

const cors = require("cors");
//create instance of express app
const app = express();

require("dotenv").config();
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
const userRoutes = require("./routes/user");
app.use("/api", userRoutes);
// Mount routes

const PORT = process.env.PORT || 3000; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
