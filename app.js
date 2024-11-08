//import express frame to build server
//import dependencies
const express = require("express");
const { Pool } = require("pg"); // Import the Pool object from the 'pg' module

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
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
//define routes
const user = require("./routes/user");
const student = require("./routes/student");
const topic = require("./routes/topic");
const quizz = require("./routes/quizz");
const chapter = require("./routes/chapter");
const moduleRoutes = require("./routes/module");
const questions = require("./routes/questions"); // Import question routes

// Use routes
app.use("/api", user);
app.use("/api/student", student);
app.use("/api", topic);
app.use("/api", quizz);
app.use("/api", chapter);
app.use("/api", moduleRoutes);
app.use("/api/question", questions); // Use question routes
app.use(cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

//starting the server
const PORT = process.env.FS_PORT || 3001; // Use the PORT environment variable if set, otherwise default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
