const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Routes
router.get("/", userController.show);
router.post("/", userController.find);
router.get("/adduser", userController.form);
router.post("/adduser", userController.create);
router.get("/edituser/:id", userController.edit);
router.post("/edituser/:id", userController.update);
router.get("/viewuser/:id", userController.viewall);

router.get("/deleteuser/:id", userController.delete);
router.post("/deleteuser/:id", userController.deleteuser);
//router.get('/:id',userController.delete);

module.exports = router;
