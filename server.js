const inquirer = require('inquirer');

// Starts the Application
function startApplication() {
    console.log('Welcome to the Employee Tracking Database!');
    showOptions();
}

// Calls the startApplication function to begin the program.
startApplication();

// Database Options
function showOptions() {
    console.log ('Please select an option:\n');
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
        // Handles the selected option
        handleOption(answers.option);
    });
}

// Helper function to handle the selected option
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
        default:
            console.log('Invalid option. Please choose a valid option.\n');
    }
}