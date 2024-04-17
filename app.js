const express = require("express");

const cors = require("cors");
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

// Socket.IO connection handler

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
