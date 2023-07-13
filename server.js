const inquirer = require('inquirer');
const connection = require('./connection'); // Import the MySql connection

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

// Start the application
startApplication();
