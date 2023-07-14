const inquirer = require('inquirer');
const connection = require('./connection'); // Import the MySql connection
const fs = require('fs');
const path = require('path');
const { error } = require('console');
const figlet = require('figlet'); // Import the figlet library


// Function to start the application
function startApplication() {
  console.log('Welcome to the Employee Tracking Database!');
  displayLogo();
}

// Function to display the ASCII art logo
function displayLogo() {
  figlet('Employee Tracker', (error, data) => {
    if (error) {
      console.error('Error generating ASCII art:', error);
      return;
    }
    console.log(data);
    showOptions();
  });
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
        'View employees by manager',
        'Add a department',
        'Add a role',
        'Add an employee',
        'Update an employee role',
        'Delete an Employee',
        'Delete a Department',
        'Exit',
      ],
    },
  ])
  .then((answers) => {
    const option = answers.option;
    if (option === 'Exit') {
      // Exit the application if "Exit" option is chosen
      console.log('Exiting the application...');
      connection.end(); // Close the MySQL connection
      return;
    }
    // Calls function to handle the selected option
    handleOption(option);
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
    case 'View employees by manager':
      viewEmployeesByManager();
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
    case 'Delete an Employee':
      deleteEmployee();
      break;
    case 'Delete a Department':
      deleteDepartment();
      break;
    default:
      console.log('Invalid option. Please choose a valid option.\n');
      break;
  }
}

// function for viewing all departments
function viewAllDepartments() {
    const filePath = path.join(__dirname, 'db', 'viewAllDepartments.sql');
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

// function to see all available roles
function viewAllRoles() {
    const filePath = path.join(__dirname, 'db', 'viewAllRoles.sql');
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

// function for views employees by Manager
function viewEmployeesByManager() {
  getManagerChoices().then((managerChoices) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'managerId',
          message: 'Select a manager:',
          choices: managerChoices,
        },
      ])
      .then((answers) => {
        const { managerId } = answers;
        const filePath = path.join(__dirname, 'db', 'viewEmployeesByManager.sql');
        const query = fs.readFileSync(filePath, 'utf-8');

        connection.query(query, [managerId], (error, results) => {
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
      });
  });
}


// function  for handling viewAllEmployees
function viewAllEmployees() {
    const filePath = path.join(__dirname, 'db', 'viewAllEmployees.sql');
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

        const filePath = path.join(__dirname, 'db', 'addDepartment.sql');
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
            message: 'Enter the hourly pay rate for the role',
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
          const filePath = path.join(__dirname, 'db', 'addRole.sql');
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
    const filePath = path.join(__dirname, 'db', 'getDepartmentChoices.sql');
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

function addEmployee() {
    getRoleChoices().then((roleChoices) => {
        getManagerChoices().then((managerChoices) => {
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: "Enter the employee's first name:",
                    validate: (input) => {
                        if (input.trim() === '') {
                            return "Please enter the employee's first name.";
                        }
                        return true;
                    },
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: "Enter the employee's last name.",
                    validate: (input) => {
                        if (input.trim() === '') {
                            return "Please enter the employee's last name.";
                        }
                        return true;
                    },
                },
                {
                    type: 'list',
                    name: 'roleId',
                    message: "Select the employee's role.",
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'managerId',
                    message: "Select the employee's manager:",
                    choices: managerChoices,
                    default: 'No Manager',
                },
            ])
            .then((answers) => {
                const {firstName, lastName, roleId, managerId} = answers;
                const filePath = path.join(__dirname, 'db', 'addEmployee.sql');
                const query = fs.readFileSync(filePath, 'utf-8');

                connection.query(
                    query,
                    [firstName, lastName, roleId, managerId],
                    (error, results) => {
                        if (error) {
                            console.error('Error executing the query:', error);
                            return;
                        }

                        console.log('Employee added successfully!\n');

                        // Return to the option menu
                        showOptions();
                    }
                );
            });
        });
    });
}

// function to update the Employee's Role
function updateEmployeeRole() {
  getEmployeeChoices().then((employeeChoices) => {
    getRoleChoices().then((roleChoices) => {
      getManagerChoices().then((managerChoices) => {
        inquirer
          .prompt([
            {
              type: 'list',
              name: 'employeeId',
              message: 'Select an employee to update:',
              choices: employeeChoices,
            },
            {
              type: 'list',
              name: 'roleId',
              message: 'Select the new role for the employee:',
              choices: roleChoices,
            },
            {
              type: 'list',
              name: 'managerId',
              message: "Select the employee's new manager:",
              choices: managerChoices,
              default: 'No Manager',
            },
          ])
          .then((answers) => {
            const { employeeId, roleId, managerId } = answers;
            const filePath = path.join(__dirname, 'db', 'updateEmployee.sql');
            const query = fs.readFileSync(filePath, 'utf-8');

            connection.query(
              query,
              [roleId, managerId, employeeId],
              (error, results) => {
                if (error) {
                  console.error('Error updating employee role:', error);
                  return;
                }

                console.log('Employee role and manager updated successfully!\n');

                // Return to the options menu
                showOptions();
              }
            );
          });
      });
    });
  });
}

//   Function to delete an Employee from the Database
  function deleteEmployee() {
    getEmployeeChoices().then((employeeChoices) => {
      inquirer
        .prompt([
          {
            type: 'list',
            name: 'employeeId',
            message: 'Select an employee to delete:',
            choices: employeeChoices,
          },
        ])
        .then((answers) => {
          const { employeeId } = answers;
  
          const filePath = path.join(__dirname, 'db', 'deleteEmployee.sql');
          const query = fs.readFileSync(filePath, 'utf-8');
  
          connection.query(query, [employeeId], (error, results) => {
            if (error) {
              console.error('Error deleting employee:', error);
              return;
            }
  
            console.log('Employee deleted successfully!\n');
  
            // Return to the options menu
            showOptions();
          });
        });
    });
  }
   

// function to display the Employee options available when updating a employee's Role

function getEmployeeChoices() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'db', 'getEmployeeChoices.sql');
        const query = fs.readFileSync(filePath, 'utf-8');
        
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error fetching employee choices:', error);
                reject(error);
                return;
            }

            const choices = results.map((employee) => ({
                value: employee.id,
                name: employee.name,
            }));

            resolve(choices);
        });
    });
}

// Function to display the Role Options available when adding an Employee
function getRoleChoices() {
    const filePath = path.join(__dirname, 'db', 'getRoleChoices.sql');
    const query = fs.readFileSync(filePath, 'utf-8');

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error executing the query:', error);
                reject(error);
                return;
            }

            const choices = results.map((role) => ({
                value: role.id,
                name: role.title,
            }));

            resolve(choices);
        });
    });
}

// function to display the Manager Options available when adding an Employee
function getManagerChoices() {
    const filePath = path.join(__dirname, 'db', 'getManagerChoices.sql');
    const query = fs.readFileSync(filePath, 'utf-8');

    return new Promise((resolve, reject) => {
        connection.query(query, (error, results) => {
            if (error) {
                console.error('Error executing the query:', error);
                reject(error);
                return;
            }

            const choices = [
                { value: null, name: 'No Manager'},
                ...results.map((manager) => ({
                    value: manager.id,
                    name: `${manager.first_name} ${manager.last_name}`,
                })),
            ];

            resolve(choices);
        });
    });
}

//Function to delete Department

function deleteDepartment() {
  getDepartmentChoices().then((departmentChoices) => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'departmentId',
          message: 'Select a department to delete:',
          choices: departmentChoices,
        },
      ])
      .then((answers) => {
        const { departmentId } = answers;

        const confirmMessage = `Are you sure you want to delete the department with ID ${departmentId}? This will move all associated employees and roles to a department and role called "Not assigned".`;

        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'confirmDelete',
              message: confirmMessage,
            },
          ])
          .then((confirmation) => {
            const { confirmDelete } = confirmation;

            if (confirmDelete) {
              // SQL queries for deleting the department
              const notAssignedDepartmentQuery = 'SELECT id FROM departments WHERE name = "Not assigned"';
              const deleteDepartmentQuery = 'DELETE FROM departments WHERE id = ?';
              const updateRolesQuery = 'UPDATE roles SET department_id = ? WHERE department_id = ?';
              const updateEmployeesQuery = 'UPDATE employees SET role_id = 1 WHERE role_id = ?';

              // Transaction for executing multiple queries
              connection.beginTransaction((err) => {
                if (err) {
                  console.error('Error starting transaction:', err);
                  return;
                }

                // Retrieve the ID of the "Not assigned" department
                connection.query(notAssignedDepartmentQuery, (error, results) => {
                  if (error) {
                    console.error('Error retrieving "Not assigned" department ID:', error);
                    connection.rollback(() => {
                      console.error('Transaction rolled back due to error.');
                      showOptions();
                    });
                    return;
                  }

                  const notAssignedDepartmentId = results[0].id;

                  // Update roles associated with the department to "Not assigned" department
                  connection.query(updateRolesQuery, [notAssignedDepartmentId, departmentId], (error, results) => {
                    if (error) {
                      console.error('Error updating roles department to "Not assigned":', error);
                      connection.rollback(() => {
                        console.error('Transaction rolled back due to error.');
                        showOptions();
                      });
                      return;
                    }

                    // Update employees' department to "Not assigned"
                    connection.query(updateEmployeesQuery, [notAssignedDepartmentId, departmentId], (error, results) => {
                      if (error) {
                        console.error('Error updating employees department to "Not assigned":', error);
                        connection.rollback(() => {
                          console.error('Transaction rolled back due to error.');
                          showOptions();
                        });
                        return;
                      }

                      // Delete the department
                      connection.query(deleteDepartmentQuery, [departmentId], (error, results) => {
                        if (error) {
                          console.error('Error deleting department:', error);
                          connection.rollback(() => {
                            console.error('Transaction rolled back due to error.');
                            showOptions();
                          });
                          return;
                        }

                        // Commit the transaction
                        connection.commit((err) => {
                          if (err) {
                            console.error('Error committing transaction:', err);
                            connection.rollback(() => {
                              console.error('Transaction rolled back due to error.');
                              showOptions();
                            });
                            return;
                          }

                          console.log('Department deleted successfully! Associated employees and roles have been moved to "Not assigned".\n');

                          // Return to the options menu
                          showOptions();
                        });
                      });
                    });
                  });
                });
              });
            } else {
              console.log('Deletion of department canceled.\n');

              // Return to the options menu
              showOptions();
            }
          });
      });
  });
}




// Start the application
startApplication();
