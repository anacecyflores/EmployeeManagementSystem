DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;

USE employee_db;
CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,

  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id VARCHAR(30) NOT NULL,
  manager_id INT
);

CREATE TABLE department (
  id INT NOT NULL  PRIMARY KEY AUTO_INCREMENT,

  department_name VARCHAR(30) NOT NULL
);
-- changed from role to roles to abide by the syntax rules
CREATE TABLE roles (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT
);