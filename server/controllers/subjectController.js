const mysql = require("mysql");

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost", //process.env.DB_HOST,
  user: "root", //process.env.DB_USER,
  password: "Langgalangga1", //process.env.DB_PASS,
  database: "school_users", //process.env.DB_NAME
});

const tableName = "Subjects";
const tableId = "subjectID";

// Show Subjects
exports.show = (req, res) => {
  // User the connection
  connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("show-subjects", { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log(`The data from ${tableName} table: \n`, rows);
  });
};

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE subjectNo  LIKE ? OR subjectTitle  LIKE ?`,
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("show-subjects", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-subject");
};

// Add new user
exports.create = (req, res) => {
  const {
    subject_title,
    subject_no,
    Transcript_Load,
    paying_load,
    teaching_load,
  } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    `INSERT INTO ${tableName} SET subjectTitle   = ?, subjectNo  = ?, transcriptLoad  = ?, payingLoad = ?, teachingLoad = ?`,
    [subject_title, subject_no, Transcript_Load, paying_load, teaching_load],
    (err, rows) => {
      if (!err) {
        res.render("add-subject", { alert: "Subject added successfully." });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("edit-subject", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  console.log(req.body);
  const {
    subject_title,
    subject_no,
    Transcript_Load,
    paying_load,
    teaching_load,
  } = req.body;
  // User the connection
  connection.query(
    `UPDATE ${tableName} SET subjectTitle   = ?, subjectNo  = ?, transcriptLoad  = ?, payingLoad = ?, teachingLoad = ? WHERE ${tableId} = ?`,
    [
      subject_title,
      subject_no,
      Transcript_Load,
      paying_load,
      teaching_load,
      req.params.id,
    ],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
          [req.params.id],
          (err, rows) => {
            // When done with the connection, release it

            if (!err) {
              res.render("edit-subject", {
                rows,
                alert: `${subject_title} has been updated.`,
              });
            } else {
              console.log(err);
            }
            console.log(`The data from ${tableName} table: \n`, rows);
          }
        );
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Delete User - GET
exports.delete = (req, res) => {
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("delete-subject", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Delete User - Post
exports.deletesubject = (req, res) => {
  // User the connection
  connection.query(
    `DELETE FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
          [req.params.id],
          (err, rows) => {
            // When done with the connection, release it

            if (!err) {
              res.render("delete-subject", {
                rows,
                alert: `Subject has been deleted.`,
              });
            } else {
              console.log(err);
            }
            console.log(`The data from ${tableName} table: \n`, rows);
          }
        );
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// View Subjects
exports.viewall = (req, res) => {
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-subject", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};
