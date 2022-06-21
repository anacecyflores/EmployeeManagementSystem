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
      //  -----------------------------------
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
// FUNCTIONS for SHOW
function showEmployees() {
  const sql = "SELECT * FROM employee";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
function showDepartment() {
  const sql = "SELECT * FROM department";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
function showRoles() {
  const sql = "SELECT * FROM roles";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
// -----------------------------------------------

function addEmployee() {
  const sqlRole = "SELECT * FROM roles";
  connection.query(sqlRole, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleArr.push(result[i].title);
    }
    console.log(roleArr);

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the FIRST name of the new employee?",
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the LAST name of the new employee?",
        },
        {
          type: "list",
          name: "role",
          message: "Please choose your employee's role",
          choices: roleArr,
        },
        {
          type: "input",
          name: "manager_name",
          message: "What is the name of the new employee's manager (if any)?",
        },
      ])
      .then(function (choices) {
        console.log(
          choices.first_name,
          choices.last_name,
          choices.role,
          choices.manager_name
        );
      });
  });
}

// function updateEmployeeRole() {UPDATE roles
//     SET role=""
//     WHERE role_id=1;

// function addDepartment() { INSERT INTO department (department_name)
// VALUES("")}

// function addRole() { INSERT INTO roles ( title, salary, department_id)
// VALUES ( "", NOT NULL, NOT NULL),}
