
/***************************************************************************************************************
 *
 *
 * NOTE!!!
 *
 * - Edit the user and password in studentController.js, subjectController.js, and teacherController.js
 *   according to the user and password of your mysql account
 *
 * - Run the mysql script located at the schema.sql to initialize the database and table
 *
 **************************************************************************************************************/

const express = require('express');
const exphbs = require('express-handlebars');
const methodOverride = require("method-override");
const bodyParser = require('body-parser');
const mysql = require('mysql');

require('dotenv').config();

const app = express();
const http = require("http");
const hostname = "127.0.0.1";
const port = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true})); // New

app.use(express.json()); // New

app.use(express.static(process.cwd()+'/public'));


app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs');
 
app.use("*/css", express.static("public/css"));
app.use("*/resources", express.static("public/resources"));
app.use(
  "*/css/fontawesome-pro-5.15.3-web/css",
  express.static("public/css/fontawesome-pro-5.15.3-web/css")
);

const teacherroutes = require('./server/routes/teacher');
const studentroutes = require('./server/routes/student');
const subjectroutes = require('./server/routes/subject');

                 
app.use('/teachers', teacherroutes);
app.use('/students', studentroutes);
app.use('/subjects', subjectroutes);


//app.use('/',routes);
app.get ("/",function(req,res){
    res.render("home");
 });
 app.listen(port, hostname, () =>
 console.log(`Server running at http://${hostname}:${port}/`)
);