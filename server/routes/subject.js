const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");

// Routes
router.get("/", subjectController.show);
router.post("/", subjectController.find);
router.get("/addsubject", subjectController.form);
router.post("/addsubject", subjectController.create);
router.get("/editsubject/:id", subjectController.edit);
router.post("/editsubject/:id", subjectController.update);
router.get("/viewsubject/:id", subjectController.viewall);
router.get("/deletesubject/:id", subjectController.delete);
router.post("/deletesubject/:id", subjectController.deletesubject);

module.exports = router;
