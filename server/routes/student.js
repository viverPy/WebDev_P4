const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Routes
router.get("/", studentController.show);
router.post("/", studentController.find);
router.get("/addstudent", studentController.form);
router.post("/addstudent", studentController.create);
router.get("/editstudent/:id", studentController.edit);
router.post("/editstudent/:id", studentController.update);
router.get("/viewstudent/:id", studentController.viewall);
router.get("/deletestudent/:id", studentController.delete);
router.post("/deletestudent/:id", studentController.deletestudent);

module.exports = router;
