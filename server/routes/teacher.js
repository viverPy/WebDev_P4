const express = require('express');
const teacherRouter = express.Router();
const teacherController = require('../controllers/teacherController');

// Routes
teacherRouter.get('/', teacherController.showrecords);
teacherRouter.post('/', teacherController.find);
teacherRouter.get('/addrecord', teacherController.form);
teacherRouter.post('/addrecord', teacherController.create);
teacherRouter.get('/showrecordtoedit',teacherController.showrecordtoedit); // new version with ajax
teacherRouter.get('/updaterecord',teacherController.updaterecord); // with ajax
teacherRouter.get('/viewrecord/',teacherController.viewrecord); // with ajax
teacherRouter.get('/showrecordtodelete',teacherController.showrecordtodelete); // with ajax
teacherRouter.get('/deleterecord', teacherController.deleterecord); // with ajax

  
module.exports = teacherRouter;