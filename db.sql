-- Creates the DATABASE FOR THE TABLES
DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

-- Creates the departments table
CREATE TABLE departments (
    id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Inserts sample data into the departments table for testing purposes
INSERT INTO departments (id, name) VALUES (1, 'Department A');
INSERT INTO departments (id, name) VALUES (2, 'Department B');