const mysql = require("mysql");

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost", //process.env.DB_HOST,
  user: "root", //process.env.DB_USER,
  password: "Langgalangga1", //process.env.DB_PASS,
  database: "school_users", //process.env.DB_NAME
});

const tableName = "Teachers";
const tableId = "teacherID";

// Show Teachers
exports.show = (req, res) => {
  // User the connection
  connection.query(`SELECT * FROM ${tableName}`, (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render("show-teachers", { rows, removedUser });
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
    `SELECT * FROM ${tableName} WHERE teacherFirstName  LIKE ? OR teacherLastname  LIKE ?`,
    ["%" + searchTerm + "%", "%" + searchTerm + "%"],
    (err, rows) => {
      if (!err) {
        res.render("show-teachers", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

exports.form = (req, res) => {
  res.render("add-teacher");
};

// Add new user
exports.create = (req, res) => {
  const { first_name, middle_name, last_name } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query(
    `INSERT INTO ${tableName} SET teacherFirstName   = ?, teacherMiddleName  = ?, teacherLastname  = ?`,
    [first_name, middle_name, last_name],
    (err, rows) => {
      if (!err) {
        res.render("add-teacher", { alert: "Teacher added successfully." });
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
        res.render("edit-teacher", { rows });
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
    `UPDATE ${tableName} SET teacherFirstName   = ?, teacherMiddleName  = ?, teacherLastname  = ? WHERE ${tableId} = ?`,
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
              res.render("edit-teacher", {
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
        res.render("delete-teacher", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};

// Delete User - Post
exports.deleteteacher = (req, res) => {
  const { first_name, last_name } = req.body;
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
              res.render("delete-teacher", {
                rows,
                alert: `The record of ${first_name} ${last_name} has been deleted.`,
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

// View Teachers
exports.viewall = (req, res) => {
  // User the connection
  connection.query(
    `SELECT * FROM ${tableName} WHERE ${tableId} = ?`,
    [req.params.id],
    (err, rows) => {
      if (!err) {
        res.render("view-teacher", { rows });
      } else {
        console.log(err);
      }
      console.log(`The data from ${tableName} table: \n`, rows);
    }
  );
};
