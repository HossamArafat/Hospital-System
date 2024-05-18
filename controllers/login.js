var express = require("express");
var home = require("./home");
var mysql = require("mysql");
var router = express.Router();
var bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

router.get("/", function (req, res) {
  res.render("login.ejs");
});

var con = mysql.createConnection({
  host: "localhost",
  database: "hm_system",
  user: "root",
  password: "",
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is reequired"),
    check("password").notEmpty().withMessage("Password is reequired"),
  ],
  function (request, response) {
    var username = request.body.username;
    var password = request.body.password;

    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      response.send(
        '<div style="text-align: center; color: red; font-size: 40px;">Please, Enter username and password!</div>'
      );
      response.end();
    } else {
      con.query(
        "select * from users where username = ? and password = ?",
        [username, password],
        function (error, results, fields) {
          if (results.length > 0) {
            response.cookie('username' , username);
            console.log("Logged In!");            
            response.redirect("/home");
          } else {
            response.send(
              `
              <div style="text-align: center; color: red; font-size: 38px;">
                Incorrect Username or Password! <a href="/login" style="font-weight: bold; color: inherit; text-decoration: none;" >Try again</a>
              </div>
             `
            );
          }
          response.end();
        }
      );
    }
  }
);

module.exports = router;
