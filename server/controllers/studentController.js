const mysql = require("mysql");

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root", // EDIT THIS ACCORDING TO YOUR MYSQL ACCOUNT
  password: "Langgalangga1", // EDIT THIS ACCORDING TO YOUR MYSQL ACCOUNT
  database: "school_users",
});

const tableName = "Students";
const tableId = "studentID";

// Show Students
exports.show = (req, res) => {
  // User the connection
  connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("show-students", { rows, removedUser });
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
    `SELECT * FROM ${tableName} WHERE StudentFirstName  LIKE ? OR studentLastname  LIKE ?`,
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("show-students", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-student");
};

// Add new user
exports.create = (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    `INSERT INTO ${tableName} SET StudentFirstName   = ?, studentMiddleName  = ?, studentLastname  = ?`,
    [first_name, middle_name, last_name],
    (err, rows) => {
      if (!err) {
        res.render("add-student", { alert: "Student added successfully." });
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
        res.render("edit-student", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Update User
exports.update = (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  // User the connection
  connection.query(
    `UPDATE ${tableName} SET StudentFirstName   = ?, studentMiddleName  = ?, studentLastname  = ? WHERE ${tableId} = ?`,
    [first_name, middle_name, last_name, req.params.id],
    (err, rows) => {
      if (!err) {
        // User the connection
        connection.query(
          `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
          [req.params.id],
          (err, rows) => {
            // When done with the connection, release it

            if (!err) {
              res.render("edit-student", {
                rows,
                alert: `${first_name} has been updated.`,
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
        res.render("delete-student", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Delete User - Post
exports.deletestudent = (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
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
              res.render("delete-student", {
                rows,
                alert: `Student has been deleted.`,
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

// View Students
exports.viewall = (req, res) => {
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-student", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};
