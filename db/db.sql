-- Creates the DATABASE FOR THE TABLES
DROP DATABASE IF EXISTS grocery_db;
CREATE DATABASE grocery_db;
USE grocery_db;

-- Creates the departments table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100)
);

-- Inserts sample data into the departments table for testing purposes
INSERT INTO departments (name) VALUES ('Not Assigned');
INSERT INTO departments (name) VALUES ('Front End');
INSERT INTO departments (name) VALUES ('Grocery');
INSERT INTO departments (name) VALUES ('Meat');
INSERT INTO departments (name) VALUES ('Produce');

-- Creates the roles table
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Inserts sample data into the roles table
INSERT INTO roles (title, salary, department_id) VALUES ('Cashier', 35000, 2);
INSERT INTO roles (title, salary, department_id) VALUES ('Stock Clerk', 37000, 3);
INSERT INTO roles (title, salary, department_id) VALUES ('Butcher', 38000, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Baker', 37500, 4);
INSERT INTO roles (title, salary, department_id) VALUES ('Produce Clerk', 38000, 5);

-- Creates the employees table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Inserts sample data into the employees table for testing purposes
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Fred', 'Johnson', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('July', 'Maples', 2, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Michael', 'Smith', 3, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Emily', 'Brown', 4, 2);
