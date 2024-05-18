var mysql = require("mysql");

// connection composes from host(machine), user(mySQL), database(i want to deal)
var con = mysql.createConnection({
  host: "localhost",
  database: "hm_system",
  user: "root", //root has the hight level of privilegs user for mysql installation, to change the root we use : mysql -u newUser -p
  password: "",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("You are connected in Database!");
  }
});

module.exports.signup = function (username, email, password, status, callback) {
  var query =
    "INSERT INTO `users`(`username`,`email`,`password`,`email_status`) VALUES ('" +
    username +
    "','" +
    email +
    "','" +
    password +
    "','" +
    status +
    "')";
  con.query(query, callback);
};


module.exports.add_doctor = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "INSERT INTO `doctor`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`,`image`,`department`,`biography`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    email +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "','" +
    image +
    "','" +
    department +
    "','" +
    biography +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllDoc = function (callback) {  
  var query = "select * from doctor";
  con.query(query, callback);  
};

module.exports.getDocbyId = function (id, callback) { 
  var query = "select * from doctor where id =" + id;
  con.query(query, callback);
};

module.exports.editDoc = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  department,
  biography,
  callback
) {
  var query =
    "update `doctor` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "',`image`='" +
    image +
    "',`department`='" +
    department +
    "',`biography`='" +
    biography +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.add_patient = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  callback
) {
  var query =
    "INSERT INTO `patient`(`first_name`,`last_name`,`email`,`dob`,`gender`,`address`,`phone`) values ('" +
    first_name +
    "','" +
    last_name +
    "','" +
    email +
    "','" +
    dob +
    "','" +
    gender +
    "','" +
    address +
    "','" +
    phone +
    "')";
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllPatient = function (callback) {
  var query = "select * from patient";
  con.query(query, callback);
};

module.exports.getPatById = function (id, callback) {
  var query = "select * from patient where id =" + id;
  con.query(query, callback);
};

module.exports.editPatient = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  callback
) {
  var query =
    "update `patient` set `first_name`='" +
    first_name +
    "', `last_name`='" +
    last_name +
    "', `email`='" +
    email +
    "', `dob`='" +
    dob +
    "',`gender`='" +
    gender +
    "',`address`='" +
    address +
    "',`phone`='" +
    phone +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.deleteDoc = function (id, callback) {
  //console.log("i m here");
  var query = "delete from doctor where id=" + id;
  con.query(query, callback);
};

module.exports.deletePatient = function (id, callback) {
  //console.log("i m here");
  var query = "delete from patient where id=" + id;
  con.query(query, callback);
};

module.exports.add_appointment = function (
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "insert into appointment (patient_name,department,doctor_name,date,time,email,phone) values ('" +
    p_name +
    "','" +
    department +
    "','" +
    d_name +
    "','" +
    date +
    "','" +
    time +
    "','" +
    email +
    "','" +
    phone +
    "')";
  con.query(query, callback);
};

module.exports.getallappointment = function (callback) {
  var query = "select * from appointment";
  con.query(query, callback);
};

module.exports.searchDoc = function (key, callback) {
  var query = 'SELECT  *from doctor where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.searchPatient = function (key, callback) {
  var query = 'SELECT  *from patient where first_name like "%' + key + '%"';
  con.query(query, callback);
  console.log(query);
};

module.exports.getappointmentbyid = function (id, callback) {
  var query = "select * from appointment where id=" + id;
  console.log(query);
  con.query(query, callback);
};

module.exports.editappointment = function (
  id,
  p_name,
  department,
  d_name,
  date,
  time,
  email,
  phone,
  callback
) {
  var query =
    "update appointment set patient_name='" +
    p_name +
    "',department='" +
    department +
    "',doctor_name='" +
    d_name +
    "',date='" +
    date +
    "',time='" +
    time +
    "',email='" +
    email +
    "',phone='" +
    phone +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.deleteappointment = function (id, callback) {
  var query = "delete from appointment where id=" + id;
  con.query(query, callback);
};

module.exports.findOne = function (email, callback) {
  var query = "select *from users where email='" + email + "'";
  con.query(query, callback);
  console.log(query);
};


module.exports.setpassword = function (id, newpassword, callback) {
  var query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.add_dept = function (name, desc, callback) {
  var query =
    "insert into departments(department_name,department_desc) values ('" +
    name +
    "','" +
    desc +
    "')";
  con.query(query, callback);
};

module.exports.getalldept = function (callback) {
  var query = "select * from departments";
  con.query(query, callback);
};

module.exports.delete_department = function (id, callback) {
  var query = "delete from departments where id=" + id;
  con.query(query, callback);
};

module.exports.getdeptbyId = function (id, callback) {
  var query = "select * from departments where id=" + id;
  con.query(query, callback);
};

module.exports.edit_dept = function (id, name, desc, callback) {
  var query =
    "update departments set department_name='" +
    name +
    "',department_desc='" +
    desc +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  var query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  console.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  var query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  console.log(query);
};
