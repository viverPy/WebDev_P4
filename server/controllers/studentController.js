const mysql = require('mysql');
var url = require('url');

// Connection Pool
let connection = mysql.createConnection({
  host: 'localhost', //process.env.DB_HOST,
  user: 'root', //process.env.DB_USER,
  password: 'Langgalangga1', //process.env.DB_PASS,
  database: 'school_users' //process.env.DB_NAME
});

exports.showrecords = (req, res) => {
  connection.query('SELECT * FROM Students', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('show-students', { rows, removedUser, jscript:'studentclient.js' });
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM Students WHERE studentFirstName LIKE ? OR studentLastname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) 
    {
     res.render('show-students', { rows, jscript:'studentclient.js' });
   } else 
   {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-Student');
}

exports.create = (req, res) => {
  const { first_name, last_name, middle_name } = req.body;
  let searchTerm = req.body.search;

  console.log(first_name, last_name, middle_name);

  connection.query('INSERT INTO Students SET studentFirstName = ?, studentLastname = ?, studentMiddleName = ?', [first_name, last_name, middle_name], (err, rows) => {
    if (!err) {
      res.render('add-student', { alert: 'Student added successfully.', jscript:'studentclient.js'});
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}


exports.showrecordtoedit = (req, res) => {
  var studentId = req.query.id;
  // User the connection
  connection.query('SELECT * FROM Students WHERE studentID = ?',[studentId], (err, rows) => {
    if (!err) {
      res.render('edit-student', { rows, jscript:'studentclient.js' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.updaterecord = (req, res) => {
  var studentId = req.query.id;
  var fname = req.query.first_name;
  var lname = req.query.last_name;
  var mname = req.query.middle_name;


  console.log(studentId, fname, lname, mname);
  connection.query('UPDATE Students SET studentFirstName = ?, studentLastname = ?, studentMiddleName = ? WHERE studentID = ?', [fname, lname, mname, studentId], (err, rows) => {


  
  });
}

exports.showrecordtodelete = (req, res) => {
  var studentId = req.query.id;
  connection.query('SELECT * FROM Students WHERE studentID = ?', [studentId], (err, rows) => {
    if (!err) {
      res.render('delete-student', { rows, jscript:'studentclient.js' });
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}


exports.deleterecord = (req, res) => {
  
  var studentId = req.query.id;
  connection.query('delete from Students WHERE studentID= ?', [studentId], (err, rows) => {

    if (err) 
        {
          console.log(err);
          
        }
    
   
  });
  console.log('Deleted record');
}

exports.viewrecord = (req, res) => {

  var studentId = req.query.id;

  connection.query('SELECT * FROM Students WHERE studentID = ?',[studentId], (err, rows) => {  
    if (!err) {
     res.render('view-students', { rows, jscript:'studentclient.js' });
      
    } else {
     console.log(err);
    }
   console.log('The data from student id: \n rows: \n ',studentId, rows);

  });  

}

