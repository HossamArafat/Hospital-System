var express = require("express");
var app = express();
var cookieParser = require("cookie-parser");


var landing = require("./controllers/landing");
var signup = require("./controllers/signup");
var login = require("./controllers/login");
var home = require("./controllers/home");
var doctors = require("./controllers/doctors.js");
var patients = require("./controllers/patients.js");
var logout = require("./controllers/logout");
var appointment = require("./controllers/appointment");


app.use(express.static("./public"));
app.use(express.urlencoded({extended : true}));  
app.use(express.json());
app.use(cookieParser());   

var port = 3000;
var server = app.listen(port, function () {
  console.log(`server started on port: ${port}`);
});

app.use("/", landing); 
app.use("/signup", signup); 
app.use("/login", login);
app.use("/home", home);
app.use("/doctors", doctors);
app.use("/patients", patients);
app.use("/logout", logout);
app.use("/appointment", appointment);

