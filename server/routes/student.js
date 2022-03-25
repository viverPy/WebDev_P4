const express = require('express');
const studentRouter = express.Router();
const studentController = require('../controllers/studentController');

// Routes
studentRouter.get('/', studentController.showrecords);
studentRouter.post('/', studentController.find);
studentRouter.get('/addrecord', studentController.form);
studentRouter.post('/addrecord', studentController.create);
studentRouter.get('/showrecordtoedit',studentController.showrecordtoedit); // new version with ajax
studentRouter.get('/updaterecord',studentController.updaterecord); // with ajax
studentRouter.get('/viewrecord/',studentController.viewrecord); // with ajax
studentRouter.get('/showrecordtodelete',studentController.showrecordtodelete); // with ajax
studentRouter.get('/deleterecord', studentController.deleterecord); // with ajax

  
module.exports = studentRouter;