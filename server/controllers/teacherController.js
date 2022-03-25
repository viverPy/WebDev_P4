const mysql = require('mysql');
var url = require('url');

// Connection Pool
let connection = mysql.createConnection({
  host: 'localhost', //process.env.DB_HOST,
  user: 'root', //process.env.DB_USER,
  password: 'Langgalangga1', //process.env.DB_PASS,
  database: 'school_users' //process.env.DB_NAME
});

// Show Users
exports.showrecords = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM Teachers', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('show-teachers', { rows, removedUser, jscript:'teacherclient.js' });
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM Teachers WHERE teacherFirstName LIKE ? OR teacherLastname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) 
    {
     res.render('show-teachers', {rows, jscript:'teacherclient.js'});
   } else 
   {
      console.log(err);
    }
   // console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-Teacher');
}

// Add new user
exports.create = (req, res) => {
  const { first_name, last_name, middle_name } = req.body;
  let searchTerm = req.body.search;

  console.log(first_name, last_name, middle_name);

  // User the connection
  connection.query('INSERT INTO Teachers SET teacherFirstName = ?, teacherLastname = ?, teacherMiddleName = ?', [first_name, last_name, middle_name], (err, rows) => {
    if (!err) {
      res.render('add-teacher', { alert: 'Teacher added successfully.', jscript:'teacherclient.js'});
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}


// show record to edit (get) show user to edit- new version with ajax
exports.showrecordtoedit = (req, res) => {
  var tid = req.query.id;
  // User the connection
  connection.query('SELECT * FROM Teachers WHERE teacherID = ?',[tid], (err, rows) => {
    if (!err) {
      res.render('edit-teacher', { rows, jscript:'teacherclient.js' });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}



// Update record (GET) - new version WITH AJAX
exports.updaterecord = (req, res) => {
  //const { first_name, last_name, email, phone, comments } = req.body;
  var tid = req.query.id;
  var fname = req.query.first_name;
  var lname = req.query.last_name;
  var mname = req.query.middle_name;


  
  //connection
  connection.query('UPDATE Teachers SET teacherFirstName = ?, teacherLastname = ?, teacherMiddleName = ? WHERE teacherID = ?', [fname, lname, mname, tid], (err, rows) => {

  
  });
}

// Show Record to delete- GET - NEW VERSION WITH AJAX
exports.showrecordtodelete = (req, res) => {
  var tid = req.query.id;
  // User connection
  connection.query('SELECT * FROM Teachers WHERE teacherID = ?', [tid], (err, rows) => {
    if (!err) {
      res.render('delete-teacher', { rows, jscript:'teacherclient.js' });
    } else {
      console.log(err);
    }
   console.log('The data from user table: \n', rows);
  });
}


// Delete Record - delete NEW version - WITH AJAX
exports.deleterecord = (req, res) => {
  
  var tid = req.query.id;

  //console.log('to delete id '+ uid);
  // connection
  connection.query('delete from Teachers WHERE teacherID = ?', [tid], (err, rows) => {

    if (err) 
        {
          console.log(err);
        }
    
   
  });
  console.log('Deleted record');
}


// View a single record - with AJAX
exports.viewrecord = (req, res) => {

  // User the connection
  var uid = req.query.id;
 // var querystr = 'SELECT * FROM USER WHERE id='+uid;

  connection.query('SELECT * FROM Teachers WHERE teacherID=?',[uid], (err, rows) => {  
    if (!err) {
    //  console.log('To render received the data from user id:'+uid+' rows length:'+rows.length);
     res.render('view-teachers', { rows, jscript:'teacherclient.js' });
      
    } else {
     console.log(err);
    }
   console.log('The data from teacher id: \n rows: \n ',uid, rows);
   // console.log('rows returned:'+rows.length);

  });  

}

