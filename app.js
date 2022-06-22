const mysql = require("mysql2");
const inquirer = require("inquirer");
const ct = require("console.table");

// create the connection to database
const con = mysql.createConnection({
  host: "localhost",
  user: "runSql",
  password: "1234",
  database: "employee_db",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Wow!");
});

init();
function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choices",
        message: "Choose an option",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
        ],
      },
    ])
    .then(function (selection) {
      console.log(selection.choices);
      if (selection.choices === "View all Employees") {
        showEmployees();
      }
      if (selection.choices === "View all Departments") {
        showDepts();
      }
      if (selection.choices === "View all Roles") {
        showRoles();
      }
      if (selection.choices === "Add a Role") {
        addRole();
      }
      if (selection.choices === "Add a Department") {
        addDept();
      }
      if (selection.choices === "Add an Employee") {
        addEmp();
      }
      if (selection.choices === "Update an Employee Role") {
        updateRole();
      }
    });
}

function showEmployees() {
  const sql = "SELECT * FROM employee";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

function showDepts() {
  const sql = "SELECT * FROM department";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

function showRoles() {
  const sql = "SELECT * FROM roles";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}

//-------------------------------------------------------------------------------

function addEmp() {
  const sqlR = "SELECT * FROM roles";
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleId = result[i].id;
      console.log(roleTitle, roleId);
      roleArr.push({ name: roleTitle, value: roleId });
    }
    console.log(roleArr);

    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "Enter the employee's first name",
        },
        {
          type: "input",
          name: "last_name",
          message: "Enter the employee's last name",
        },
        {
          type: "list",
          name: "role_id",
          message: "Choose the employee's Role",
          choices: roleArr,
        },
        //manager_id must be integer for field value
        {
          type: "input",
          name: "manager_id",
          message: "Enter the employee's manager ID(if applicable)",
        },
      ])
      .then(function (choices) {
        console.log(
          choices.first_name,
          choices.last_name,
          choices.role_id,
          choices.manager_id
        );

        const sql = con.query("INSERT INTO employee SET ?", {
          first_name: choices.first_name,
          last_name: choices.last_name,
          role_id: choices.role_id,
          manager_id: choices.manager_id,
        });
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.table(result);
        });
      });
  });
}

function addRole() {
  const sql =
    'INSERT INTO roles (title, salary, department_id) VALUES ("", "", 1)';
}
function addDept() {
  const sql = 'INSERT INTO department (name) VALUES ("")';
}
function updateRole() {
  const sql =
    'UPDATE employee SET first_name =(""), last_name = (""), role_id = 1, manager_id =1';
}
