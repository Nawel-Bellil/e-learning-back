const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/module");
const { protect } = require("../middleware/authMiddleware");

// Route to create a new module
router.post("/modules", protect, module.createModule);

// Route to get all modules
router.get("/modules", protect, module.getAllModules);

// Route to get a module by ID
router.get("/modules/:id", protect, modulE.getModuleById);

// Route to delete a module by ID
router.delete("/modules/:id", protect, module.deleteModule);

module.exports = router;
