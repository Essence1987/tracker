const inquirer = require('inquirer');
const connection = require('./connection'); // Import the MySql connection
const fs = require('fs');
const path = require('path');


// Function to start the application
function startApplication() {
  console.log('Welcome to the Employee Tracking Database!');
  showOptions();
}

// Present options using inquirer
function showOptions() {
  console.log('Please select an option:\n');
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Choose an option:',
      choices: [
        'View all departments',
        'View all roles',
        'View all employees',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role'
      ],
    },
  ])
    .then((answers) => {
      // Calls function to handle the selected option
      handleOption(answers.option);
    });
}

// function for handling the selected option
function handleOption(option) {
  switch (option) {
    case 'View all departments':
      viewAllDepartments();
      break;
    case 'View all roles':
      viewAllRoles();
      break;
    case 'View all employees':
      viewAllEmployees();
      break;
    case 'Add a department':
      addDepartment();
      break;
    case 'Add a role':
      addRole();
      break;
    case 'Add an employee':
      addEmployee();
      break;
    case 'Update an employee role':
      updateEmployeeRole();
      break;
    default:
      console.log('Invalid option. Please choose a valid option.\n');
      break;
  }
}

// function for viewing all departments
function viewAllDepartments() {
    const filePath = path.join(__dirname, 'viewAllDepartments.sql');
    const query = fs.readFileSync(filePath, 'utf-8');
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }
  
      const tableData = results.map((department) => {
        return {
          'Department ID': department.id,
          'Department Name': department.name,
        };
      });
  
      console.table(tableData);
  
      // Return to the options menu
      showOptions();
    });
}

function viewAllRoles() {
    const filePath = path.join(__dirname, 'viewAllRoles.sql');
    const query = fs.readFileSync(filePath, 'utf-8');
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error executing the query:', error);
            return;
        }

        const tableData = results.map((role) => {
            return{
                'Role ID': role.id,
                'Job Title': role.title,
                'Department': role.department,
                'Salary': role.salary,
            };
        });
        console.table(tableData);

        // Return to Options Menu
        showOptions();
    });
}

// function  for handling viewAllEmployees
function viewAllEmployees() {
    const filePath = path.join(__dirname, 'viewAllEmployees.sql');
    const query = fs.readFileSync(filePath, 'utf-8');
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        return;
      }
  
      const tableData = results.map((employee) => {
        return {
          'Employee ID': employee['Employee ID'],
          'First Name': employee['First Name'],
          'Last Name': employee['Last Name'],
          'Job Title': employee['Job Title'],
          'Department': employee['Department'],
          'Salary': employee['Salary'],
          'Manager': employee['Manager'],
        };
      });
  
      console.table(tableData);
  
      // Return to the options menu
      showOptions();
    });
  }

// Function for adding a department

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'departmentName',
            message: 'Enter the name of the department:',
            validate: (input) => {
                if (input.trim() === '') {
                    return 'Please enter a valid department name.';
                }
                return true;
            },
        },
    ])
    .then((answers) => {
        const departmentName = answers.departmentName;

        const filePath = path.join(__dirname, 'addDepartment.sql');
        const query = fs.readFileSync(filePath, 'utf-8');
        connection.query(query, [departmentName], (error, results) => {
            if (error) {
                console.error('Error executing the query', error);
                return;
            }
            
            console.log('Department added successfully.');

            // Return to the options menu
            showOptions();
        });
    });
}

// function for addRole Option

function addRole() {
    getDepartmentChoices().then((choices) => {
      inquirer
        .prompt([
          {
            type: 'input',
            name: 'title',
            message: 'Enter the title of the role:',
            validate: (input) => {
              if (input.trim() === '') {
                return 'Please enter a valid title.';
              }
              return true;
            },
          },
          {
            type: 'number',
            name: 'salary',
            message: 'Enter the yearly salary for the role',
            validate: (input) => {
              if (input < 0 || isNaN(input)) {
                return 'Please enter a valid salary.';
              }
              return true;
            },
          },
          {
            type: 'list',
            name: 'departmentId',
            message: 'Select the department for the role:',
            choices: choices,
          },
        ])
        .then((answers) => {
          const { title, salary, departmentId } = answers;
          const filePath = path.join(__dirname, 'addRole.sql');
          const query = fs.readFileSync(filePath, 'utf-8');
  
          connection.query(query, [title, salary, departmentId], (error, results) => {
            if (error) {
              console.error('Error executing the query:', error);
              return;
            }
  
            console.log('Role added successfully!\n');
  
            // Return to the options menu
            showOptions();
          });
        });
    });
  }
  

// function to display the Department Options available when adding a Role

function getDepartmentChoices() {
    const filePath = path.join(__dirname, 'getDepartmentChoices.sql');
    const query = fs.readFileSync(filePath, 'utf-8');
  
    return new Promise((resolve, reject) => {
      connection.query(query, (error, results) => {
        if (error) {
          console.error('Error executing the query:', error);
          reject(error);
          return;
        }
  
        const choices = results.map((department) => ({
          value: department.id,
          name: department.name,
        }));
  
        resolve(choices);
      });
    });
  }  

// Start the application
startApplication();
