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
  connection.query('SELECT * FROM Subjects', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('show-subjects', { rows, removedUser, jscript:'subjectclient.js' });
    } else {
      console.log(err);
    }
  });
}

exports.find = (req, res) => {
  let searchTerm = req.body.search;
  connection.query('SELECT * FROM Subjects WHERE subjectTitle LIKE ? OR subjectNo LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) 
    {
    res.render('show-subjects', {rows, jscript:'subjectclient.js'});
   } else 
   {
      console.log(err);
    }
  });
}

exports.form = (req, res) => {
  res.render('add-Subject');
}

exports.create = (req, res) => {
  const {subject_title, subject_number, transcript_load, paying_load, teaching_load} = req.body;
  let searchTerm = req.body.search;

  console.log(subject_title, subject_number, transcript_load, paying_load, teaching_load);

  connection.query('INSERT INTO Subjects SET subjectTitle = ?, subjectNo = ?, transcriptLoad = ?, payingLoad = ?, teachingLoad = ?', [subject_title, subject_number, transcript_load, paying_load, teaching_load], (err, rows) => {
     if (!err) {
       res.render('add-subject', { alert: 'subject added successfully.', jscript:'subjectclient.js'});
    } else {
      console.log(err);
    }
  });
}


exports.showrecordtoedit = (req, res) => {
  var sid = req.query.id;
  connection.query('SELECT * FROM Subjects WHERE subjectID = ?',[sid], (err, rows) => {
    if (!err) {
      res.render('edit-subject', { rows, jscript:'subjectclient.js' });
    } else {
      console.log(err);
    }
  });
}




exports.updaterecord = (req, res) => {

  var subjectId = req.query.id;
  var subjectTitle = req.query.subject_title;
  var subjectNo = req.query.subject_number;
  var transcriptLoad = req.query.transcript_load;
  var payingLoad = req.query.paying_load;
  var teachingLoad = req.query.teaching_load;
  console.log(subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad, subjectId);
  connection.query('UPDATE Subjects SET subjectTitle = ?, subjectNo = ?, transcriptLoad = ?, payingLoad = ?, teachingLoad = ? WHERE subjectID = ?', [subjectTitle, subjectNo, transcriptLoad, payingLoad, teachingLoad, subjectId], (err, rows) => {

  
  });
}

exports.showrecordtodelete = (req, res) => {
  var subjectId = req.query.id;
  connection.query('SELECT * FROM Subjects WHERE subjectID = ?', [subjectId], (err, rows) => {
    if (!err) {
      res.render('delete-subject', { rows, jscript:'subjectclient.js' });
    } else {
      console.log(err);
    }
  });
}


exports.deleterecord = (req, res) => {
  
  var subjectId = req.query.id;

  connection.query('delete from Subjects WHERE subjectID= ?', [subjectId], (err, rows) => {

    if (err) 
        {
          console.log(err);
          
        }
    
   
  });
  console.log('Deleted record');
}


exports.viewrecord = (req, res) => {

  var subjectId = req.query.id;

  connection.query('SELECT * FROM Subjects WHERE subjectID=?',[subjectId], (err, rows) => {  
    if (!err) {
     res.render('view-Subjects', { rows, jscript:'subjectclient.js' });
      
    } else {
     console.log(err);
    }
  //  console.log('The data from subject id: \n rows: \n ',subjectId, rows);

  });  

}

