const mysql = require("mysql2");
const inquirer = require("inquirer");
const ct = require("console.table");
// Connection to database-----------------------
const con = mysql.createConnection({
  host: "localhost",
  user: "runSql",
  password: "1234",
  database: "employee_db",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Wowza!");
});
// ----------------Start Inquirer prompt-----
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
        updateRoleName();
      }
    });
}
// --------------Show Employee Function--------
function showEmployees() {
  const sql = "SELECT * FROM employee";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.table(result);
  });
}
// --------------Show Department Function------
function showDepts() {
  const sql = "SELECT * FROM department";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}
// --------------Show Roles Function------
function showRoles() {
  const sql = "SELECT * FROM roles";
  con.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    console.table(result);
  });
}
//-------------ADD Employee Function----------------
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
          //   console.table(result);
        });
      });
  });
}
// --------------ADD Role Function------
function addRole() {
  const sqlArole = "SELECT * FROM department";
  con.query(sqlArole, function (err, result) {
    if (err) throw err;
    const depArr = [];
    for (i = 0; i < result.length; i++) {
      //   console.log(result);
      depName = result[i].department_name;
      depId = result[i].id;
      //   console.log(depName, depId);
      depArr.push({ name: depName, value: depId });
    }
    // console.log(depArr);
    inquirer
      .prompt([
        {
          type: "input",
          name: "roles_title",
          message: "Enter the name of the role you want to add:",
        },
        {
          type: "input",
          name: "roles_salary",
          message: "Enter the role's salary",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which Department does this role belong to?",
          choices: depArr,
        },
      ])
      .then(function (choices) {
        // console.log(choices);
        console.log(
          choices.roles_title,
          choices.roles_salary,
          choices.department_id
        );
        const sqlAr = con.query("INSERT INTO roles SET ?", {
          title: choices.roles_title,
          salary: choices.roles_salary,
          department_id: choices.department_id,
        });
        con.query(sqlAr, function (err, result) {
          if (err) throw err;
          console.table(result);
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
      const sqlDep = con.query("INSERT INTO department SET ?", {
        department_name: input.add_department,
      });
      con.query(sqlDep, function (err, result) {
        if (err) throw err;
        console.table(result);
      });
    });
  // // --------------UPDATE Role Function------
  function updateRole() {
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
            //   console.table(result);
          });
        });
    });
  }
}
// --------------UPDATE Role Name Function------
function updateRoleName(empNameChoices) {
  const sqlUrole = "SELECT * FROM employee";
  con.query(sqlUrole, function (err, result) {
    if (err) throw err;
    const uroleArr = [];
    for (i = 0; i < result.length; i++) {
      //   console.log(result);
      firstName = result[i].first_name;
      lastName = result[i].last_name;
      console.log(firstName, lastName);
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
          message: "Which employee's role would you like to update?",
          choices: uroleArr,
        },
      ])
      .then(function (empNameChoices) {
        console.log(empNameChoices);
        return updateEmpRole(empNameChoices);
      });
  });
}
function updateEmpRole(empNameChoices) {
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
          type: "list",
          name: "roles",
          message: "What role would you like to update?",
          choices: roleArr,
        },
      ])
      .then(function (roleChoices) {
        console.log(roleChoices);
        return updateEmpManager(empNameChoices, roleChoices);
      });
  });
}
function updateEmpManager(empNameChoices, roleChoices) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "manager_id",
        message: "What is the manager's ID for this Employee?",
      },
    ])
    .then(function (managerOption) {
      console.log(empNameChoices, roleChoices, managerOption);
    });
  const sqlUpdate = `UPDATE employee SET role_id =? WHERE last_name =?`;
  const empVals = [roleChoices.roles, empNameChoices.employee_name.lastName];
  con.query(sqlUpdate, empVals, (err, response) => {
    if (err) throw err;
    console.log(response);
  });
}
