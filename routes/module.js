const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/module");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new module
router.post("/modules", protect, moduleController.createModule);

// Route to get all modules
router.get("/modules", protect, moduleController.getAllModules);

// Route to get a module by ID
router.get("/modules/:id", protect, moduleController.getModuleById);

// Route to delete a module by ID
router.delete("/modules/:id", protect, moduleController.deleteModule);

module.exports = router;
