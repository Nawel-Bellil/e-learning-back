const express = require("express");
const router = express.Router();
const moduleController = require("../contollers/module");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new module
router.post("/module", moduleController.createModule);

// Route to get all modules
router.get("/modules", moduleController.getAllModules);

// Route to get a module by ID
router.get("/modules/:id", moduleController.getModuleById);

// Route to delete a module by ID
router.delete("/modules/:id", moduleController.deleteModule);

module.exports = router;
