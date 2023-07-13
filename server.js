const inquirer = require('inquirer');
const connection = require('./connection'); // Import the MySql connection
const { error, table } = require('console');


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
    const query = 'SELECT id, name FROM departments';
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
    const query = 'SELECT r.id, r.title, d.name AS department, r.salary FROM roles r INNER JOIN departments d ON r.department_id = d.id';
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

function viewAllEmployees() {
    const query = `
    SELECT
        e.id AS 'Employee ID',
        e.first_name AS 'First Name',
        e.last_name AS 'Last Name',
        r.title AS 'AS 'Job Title',
        d.name AS 'Department',
        r.salary AS 'Salary',
        CONCAT(m.first_name, ' ', m.last_name) AS 'Manager'
        FROM
          employees e
        INNER JOIN
          roles r ON e.role_id = r.id
        INNER JOIN
          departments d ON r.department_id = d.id
        LEFT JOIN
          employees m ON e.manager_id = m.id;
        `;

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

        console.log(tableData);

        // Returns to the option menu
        showOptions();
    });
}

// Start the application
startApplication();
