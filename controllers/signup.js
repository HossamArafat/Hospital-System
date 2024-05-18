var express = require("express");
var router = express.Router();
var db = require.main.require("./models/db_model");
const { check, validationResult } = require("express-validator");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
router.get("/", function (req, res) { 
  res.render("signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
    check("email").notEmpty().isEmail().withMessage("Valid Email required"),
  ],
  function (req, res) {  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    var email_status = "Verified";
    var email = req.body.email;   
    var username = req.body.username;
    var password = req.body.password;

    db.signup(username, email, password, email_status);

    res.send(
      `
      <div style="text-align: center; color: green; font-size: 38px;">
        Account is Added successfully! <a href="/login" style="font-weight: bold; color: inherit; text-decoration: none;" >Login</a>
      </div>
      `
    );
  }
);

module.exports = router;


