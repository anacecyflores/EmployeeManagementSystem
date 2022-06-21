// get the client
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require("console.table");
// create the connection to database
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

showRoles();

function showRoles() {
  const sql = "SELECT * FROM roles";
  connection.query(sql, function (err, results) {
    if (err) throw err;
    console.log(results);
    console.table(results);
  });
}
// with placeholder
// connection.query(
//   "SELECT * FROM `table` WHERE `name` = ? AND `age` > ?",
//   ["Page", 45],
//   function (err, results) {
//     console.log(results);
//   }
// );
