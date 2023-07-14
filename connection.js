const mysql = require('mysql');

// Create and export the MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Enter your username here',
    password: 'Enter Your Password Here',
    database: 'grocery_db',
});

module.exports = connection;