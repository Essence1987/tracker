-- Creates the DATABASE FOR THE TABLES
DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;
USE library_db;

-- Creates the departments table
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Creates the roles table
CREATE TABLE roles (
    id INT PRIMARY KEY,
    title VARCHAR(100),
    salary DECIMAL(10, 2),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

-- Creates the employees table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- Inserts sample data into the departments table for testing purposes
INSERT INTO departments (id, name) VALUES (1, 'Department A');
INSERT INTO departments (id, name) VALUES (2, 'Department B');

-- Inserts sample data into the roles table
INSERT INTO roles (id, title, salary, department_id) VALUES (1, 'Role A', 50000, 1);
INSERT INTO roles (id, title, salary, department_id) VALUES (2, 'Role B', 60000, 2);

-- Inserts sample data into the employees table for testing purposes
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (1, 'John', 'Doe', 1, NULL);
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) VALUES (2, 'Jane', 'Doe', 2, 1);