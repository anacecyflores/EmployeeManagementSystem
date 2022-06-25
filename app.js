const mysql = require("mysql2");
const inquirer = require("inquirer");
const ct = require("console.table");
const figlet = require("figlet");
// Connection to database-----------------------
const con = mysql.createConnection({
  host: "localhost",
  user: "runSql",
  password: "1234",
  database: "employee_db",
});
con.connect((err) => {
  if (err) throw err;
  figlet.text(
    "Welcome to Employee Tracker!",
    {
      font: "small",
      horizontalLayout: "default",
      verticalLayout: "default",
      width: 120,
      whitespaceBreak: true,
    },
    function (err, data) {
      if (err) {
        console.log("ascii art error");
      } else {
        console.log(data);
        console.log("           ");
      }
      init();
    }
  );
});
// ----------------Start Inquirer prompt-----
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
          "Delete a Department?",
          "Delete a Role?",
          "Delete an Employee?",
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
        updateRoleName();
      }
      if (selection.choices === "Delete a Department?") {
        deleteDep();
      }
      if (selection.choices === "Delete a Role?") {
        deleteRole();
      }
      if (selection.choices === "Delete an Employee?") {
        deleteEmp();
      }
    });
}
// --------------Show Employee Function--------
function showEmployees() {
  const sql =
    'SELECT employee.id AS "ID #", employee.first_name AS "First Name", employee.last_name AS "Last Name", roles.salary AS "$alary", roles.title AS "Title", department_name AS "Department", CONCAT(manager.first_name,manager.last_name) AS "Manager", employee.manager_id AS "Manager ID #"  FROM employee LEFT JOIN roles ON roles.id = employee.role_id LEFT JOIN department ON department.id = roles.department_id LEFT JOIN employee manager ON manager.id = employee.manager_id';
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}
// --------------Show Department Function------
function showDepts() {
  const sql = "SELECT * FROM department";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}

// --------------Show Roles Function------
function showRoles() {
  const sql =
    "SELECT roles.id, roles.title, roles.salary,department.department_name FROM roles LEFT JOIN department ON roles.department_id = department.id";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
    init();
  });
}
// --------------Manager Data------
let managerArr = [];
function chooseManager() {
  (sqlM =
    "SELECT first_name, last_name, id FROM employee WHERE manager_id IS NULL"),
    con.query(sqlM, function (err, response) {
      if (err) throw err;
      for (let i = 0; i < response.length; i++) {
        // console.log(response[i].first_name, response[i].last_name);
        managerFirst = response[i].first_name;
        managerLast = response[i].last_name;
        managerArr.push({
          name: `${managerFirst} ${managerLast}`,
          value: response[i].id,
        });
        // console.log(managerArr);
      }
    });
  return managerArr;
}
//-------------ADD Employee Function----------------
function addEmp() {
  const sqlR = "SELECT * FROM roles";
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      roleArr.push({ name: roleTitle, value: roleID });
    }
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
        {
          type: "list",
          name: "manager_id",
          message: "Choose employee's manager",
          choices: chooseManager(),
        },
      ])
      .then(function (choices) {
        console.log(choices);
        con.query("INSERT INTO employee SET ?", {
          first_name: choices.first_name,
          last_name: choices.last_name,
          role_id: choices.role_id,
          manager_id: choices.manager_id,
        });
        console.log(
          `${choices.first_name} ${choices.last_name} has been added`
        );
      });
  });
}
// --------------ADD Role Function------
function addRole() {
  const sqlA = "SELECT * FROM department";
  con.query(sqlA, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      depName = result[i].department_name;
      depID = result[i].id;
      depArr.push({ name: depName, value: depID });
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "roles_name",
          message: "Enter the name of the role you want to add",
        },
        {
          type: "input",
          name: "roles_salary",
          message: "Enter the salary for the role",
        },
        {
          type: "list",
          name: "dep_id",
          message: "Choose a department",
          choices: depArr,
        },
      ])
      .then(function (choices) {
        console.log(choices.roles_name, choices.roles_salary, choices.dep_id);

        con.query("INSERT INTO roles SET ?", {
          title: choices.roles_name,
          salary: choices.roles_salary,
          department_id: choices.dep_id,
        });
      });
  });
}
// // --------------ADD Department Function------
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "add_department",
        message: "Enter the name of the department you want to add:",
      },
    ])
    .then(function (input) {
      console.log(input);
      con.query("INSERT INTO department SET ?", {
        department_name: input.add_department,
      });
      console.log("Department Added!");
    });
  // // --------------UPDATE Role Function------
  function updateRoleName() {
    const sqlUrole = "SELECT * FROM employee";
    con.query(sqlUrole, function (err, result) {
      if (err) throw err;
      const uroleArr = [];
      for (i = 0; i < result.length; i++) {
        firstName = result[i].first_name;
        lastName = result[i].last_name;
        uroleArr.push({
          name: `${firstName} ${lastName}`,
          value: { firstName, lastName },
        });
      }

      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_name",
            message: "Choose an employee to update their role",
            choices: uroleArr,
          },
        ])
        .then(function (nameChoices) {
          console.log(nameChoices);
          return updateEmpRole(nameChoices);
        });
    });
  }
  // --------------UPDATE Role Name Function------
  function updateEmpRole(nameChoices) {
    const sqlR = "SELECT * FROM roles";
    con.query(sqlR, function (err, result) {
      if (err) throw err;
      const roleArr = [];
      for (i = 0; i < result.length; i++) {
        roleTitle = result[i].title;
        roleID = result[i].id;
        roleArr.push({ name: roleTitle, value: roleID });
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_role",
            message: "Choose a new role for this employee",
            choices: roleArr,
          },
        ])
        .then(function (roleChoices) {
          return updateTable(nameChoices, roleChoices);
        });
    });
  }
  // --------------UPDATE table Function------
  function updateTable(nameChoices, roleChoices) {
    const sqlUpdate = `UPDATE employee SET role_id = ?  WHERE last_name = ?`;
    const empVals = [
      roleChoices.employee_role,
      nameChoices.employee_name.lastName,
    ];
    con.query(sqlUpdate, empVals, (err, response) => {
      if (err) throw err;
      console.log("Employee role has been successfully changed");
    });
  }
}
// --------------DELETE Departmemnt Function------
function deleteDep() {
  const sqlA = "SELECT * FROM department";
  con.query(sqlA, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      depName = result[i].department_name;
      depID = result[i].id;
      depArr.push({ name: depName, value: depID });
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "dep_id",
          message: "Choose a department",
          choices: depArr,
        },
      ])
      .then(function (choices) {
        console.log(choices.roles_name, choices.roles_salary, choices.dep_id);
        con.query(
          "DELETE FROM department WHERE id=?",
          choices.dep_id,
          (err, response) => {
            if (err) throw err;
            console.log("Department Deleted!");
            init();
          }
        );
      });
  });
}
//   // --------------DELETE Role Function------
function deleteRole() {
  const sqlR = "SELECT * FROM roles";
  con.query(sqlR, function (err, result) {
    if (err) throw err;
    const roleArr = [];
    for (i = 0; i < result.length; i++) {
      roleTitle = result[i].title;
      roleID = result[i].id;
      roleArr.push({ name: roleTitle, value: roleID });
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_role",
          message: "Choose role to delete:",
          choices: roleArr,
        },
      ])
      .then(function (roleChoices) {
        // console.log(roleChoices);
        con.query(
          "DELETE FROM roles WHERE id=?",
          roleChoices.employee_role,
          (err, response) => {
            console.log("Role Deleted!");
          }
        );
      });
  });
}
//   // --------------DELETE Employee Function------
//   function deleteEmp();{}
