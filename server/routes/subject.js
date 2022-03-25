const express = require('express');
const subjectRouter = express.Router();
const subjectController = require('../controllers/subjectController');

// Routes
subjectRouter.get('/', subjectController.showrecords);
subjectRouter.post('/', subjectController.find);
subjectRouter.get('/addrecord', subjectController.form);
subjectRouter.post('/addrecord', subjectController.create);
subjectRouter.get('/showrecordtoedit',subjectController.showrecordtoedit); // new version with ajax
subjectRouter.get('/updaterecord',subjectController.updaterecord); // with ajax
subjectRouter.get('/viewrecord/',subjectController.viewrecord); // with ajax
subjectRouter.get('/showrecordtodelete',subjectController.showrecordtodelete); // with ajax
subjectRouter.get('/deleterecord', subjectController.deleterecord); // with ajax

  
module.exports = subjectRouter;