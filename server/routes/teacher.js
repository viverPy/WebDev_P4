const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacherController");

// Routes
router.get("/", teacherController.show);
router.post("/", teacherController.find);
router.get("/addteacher", teacherController.form);
router.post("/addteacher", teacherController.create);
router.get("/editteacher/:id", teacherController.edit);
router.post("/editteacher/:id", teacherController.update);
router.get("/viewteacher/:id", teacherController.viewall);

router.get("/deleteteacher/:id", teacherController.delete);
router.post("/deleteteacher/:id", teacherController.deleteteacher);

module.exports = router;
