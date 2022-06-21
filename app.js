const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require("console.table");
// Connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "runSql",
  password: "1234",
  database: "employee_db",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// calling functions
// showEmployees();
// showDepartment();
// showRoles();

// Query for Employee Table
function showEmployees() {
  const sql = "SELECT * FROM employee";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
// Query for Department Table
function showDepartment() {
  const sql = "SELECT * FROM department";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
// Query for Role Table
function showRoles() {
  const sql = "SELECT * FROM roles";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
