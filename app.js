const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const http = require("http");
const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

// Parsing middleware
// Parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // New

// Parse application/json
// app.use(bodyParser.json());
app.use(express.json()); // New

// Static Files
app.use(express.static(process.cwd() + "/public"));

// Templating Engine
app.engine("hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", "hbs");

// Connection Pool
// You don't need the connection here as we have it in userController
// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

const userroutes = require("./server/routes/teacher");
app.use("/teachers", userroutes);
//app.use('/',routes);
app.get("/", function (req, res) {
  res.render("home");
});
app.listen(port, hostname, () =>
  console.log(`Server running at http://${hostname}:${port}/`)
);
