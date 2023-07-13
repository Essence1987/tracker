const inquirer = require('inquirer');
const mysql = require('mysql');

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
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DezNat89!!!',
    database: 'library_db',
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to the database:', err);
      return;
    }

    const query = 'SELECT id, name FROM departments';
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error executing the query:', error);
        connection.end();
        return;
      }

      const tableData = results.map((department) => {
        return {
          'Department ID': department.id,
          'Department Name': department.name,
        };
      });

      console.table(tableData);

      connection.end();

      // Return to the options menu
      showOptions();
    });
  });
}

// Start the application
startApplication();
