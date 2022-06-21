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

start();
function start() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "Select an option",
        choices: [
          "VIEW all employees",
          "VIEW all roles",
          "ADD employee",
          "UPDATE employee role",
          "VIEW ALL departments",
          "ADD department",
          "ADD role",
        ],
      },
    ])
    .then(function (choices) {
      console.log(choices.options);
      if (choices.options === "VIEW all employees") {
        showEmployees();
        if (choices.options === "VIEW ALL roles") {
          showRoles();
        }
      }
      if (choices.options === "ADD employee") {
        addEmployee();
      }
      if (choices.options === "UPDATE employee role") {
        updateEmployeeRole();
      }
      if (choices.options === "VIEW ALL departments") {
        showDepartment();
        if (choices.options === "ADD department") {
          addDepartment();
        }
      }
      if (choices.options === "ADD role") {
        addRole();
      }
    });
}
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

function addEmployee() {}
function updateEmployeeRole() {}
function addDepartment() {}
function addRole() {}
