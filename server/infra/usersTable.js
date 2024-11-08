const bcrypt = require("bcryptjs");

class usersTable {
  init(connection) {
    this.connection = connection;
    this.createTableUsers();
  }

  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      connection.query(sql, [email], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  }

  validatePassword(storedPassword, providedPassword) {
    return bcrypt.compare(providedPassword, storedPassword);
  }

  createTableUsers() {
    const sql = `
            CREATE TABLE IF NOT EXISTS USERS (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(50) NOT NULL UNIQUE,
                full_name VARCHAR(100) NOT NULL,
                admin BOOLEAN NOT NULL DEFAULT FALSE,
                profession VARCHAR(50) NOT NULL,
                birthplace VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL UNIQUE,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL
            );
        
        `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating Users table: ", error);
        return;
      } else {
        console.log("Users table created successfully.");
      }
    });
  }
}

module.exports = new usersTable();
