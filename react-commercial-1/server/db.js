const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,            // Internal host provided by Railway
  user: process.env.MYSQL_USER,            // MySQL user (often 'root' or the user you created)
  password: process.env.MYSQL_PASSWORD,    // MySQL password
  database: process.env.MYSQL_DATABASE,    // Database name
  port: process.env.MYSQL_PORT || 3306     // Port (defaults to 3306, but use MYSQL_PORT if set)
});


db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL Database");
});

module.exports = db;