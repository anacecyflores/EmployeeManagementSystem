DROP DATABASE IF EXISTS employee_db;
-- Creates the "employee_db" database --
CREATE DATABASE employee_db;


USE employee_db;

CREATE TABLE employee (
  
  id INT NOT NULL,

  name VARCHAR(100) NOT NULL
);

CREATE TABLE department (
  
  id INT NOT NULL,

  name VARCHAR(100) NOT NULL
);
-- changed from role to roles to abide by the syntax rules
CREATE TABLE roles (
  
  id INT NOT NULL,

  name VARCHAR(100) NOT NULL
);