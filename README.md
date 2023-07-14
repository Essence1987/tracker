# **Employee Tracking Database** [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project provides a command-line interface for managing an employee tracking database. It allows you to view departments, roles, and employees, add new departments, roles, and employees, update an employee's role, and delete an employee from the database.

#**Table of Contents**<br><ul><li>[Features](#features)</li><li>[Installation](#installation)</li><li>[Usage](#usage)</li><li>[Technology](#technology)</li><li>[Database Schema](#database-schema)</li><li>[Tests](#tests)</li><li>[Credits](#credits)</li><li>[Contribute](#contribute)</li><li>[Questions](#questions)</li><li>[License](#license)</li>

# **Features**

- View all departments: Display a list of all departments in the database.
- View all roles: Display a list of all roles in the database.
- View all employees: Display a list of all employees in the database.
- Add a department: Add a new department to the database.
- Add a role: Add a new role to the database.
- Add an employee: Add a new employee to the database.
- Update an employee role: Update the role of an existing employee.
- Delete an Employee: Remove an employee from the database.
</br></br>

# **Installation**

1. Clone the repository to your local machine using the following command in your terminal: git@github.com:Essence1987/tracker.git
2. If needed, install the required dependencies by running the following command in the project directory: npm install
3. Set up your MySQL database by importing the db.sql file provided in the repository.
4. Configure the database connection by editing the connection.js file and providing your MySQL database credentials.
5. Start the application by running the following command: node server.js</br></br>

# **Usage**

Once the application runs, you will be presented with a menu of options. Use the arrow keys to navigate the menu and press Enter to select an option. Follow the prompts to perform the desired actions, such as adding a department, updating an employee role, or deleting an employee. The application will communicate with the MySQL database to execute the corresponding queries.

For a demonstration, please watch the following video:

https://github.com/Essence1987/tracker/assets/129245370/92185d03-1bdb-4f04-9766-ee05bdb63d1d



# **Technology**

* Node.js
* MySQL
* Inquirer.js

# **Database Schema**

The database schema for this project consists of three tables: `departments`, `roles`, and `employees`. Here is the structure of each table:

**Departments table:**

 * id (INT, Primary Key, Auto Increment)
 * name (VARCHAR(100))</br></br>

**Roles table:**



* id (INT, Primary Key, Auto Increment)
* title (VARCHAR(100))
* salary (DECIMAL(10, 2))
* department_id (INT, Foreign Key referencing departments.id)</br></br>


**Employees table:**

* id (INT, Primary Key, Auto Increment)
* first_name (VARCHAR(100))
* last_name (VARCHAR(100))
* role_id (INT, Foreign Key referencing roles.id)
* manager_id (INT, Foreign Key referencing employees.id)</br></br>

# **Test**

No tests are currently implemented for this project.

# **Credits**

This was a solo project with no contributers taking part.

# **Contribute**

This is a personal project, and contributions are not accepted at this time.

# **Questions**

Click the image below to go to my github page!

<a href="https://github.com/essence1987"><img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=essence1987&theme=default"/></a>

If you have any questions or need further assistance, please feel free to contact me:

My email is hwmelander@gmail.com

# **License**

Employee Tracking Database is released under [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT). Click on the badge for more information.
