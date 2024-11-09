class usersBackupTable {
  init(connection2) {
    this.connection = connection2;
    this.createTableUsersBackup();
  }

  createTableUsersBackup() {
    const sql = `
          CREATE TABLE IF NOT EXISTS USERS_BACKUP (
            id INT NOT NULL, 
            deleted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
            PRIMARY KEY (id)
          );
        `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating Users table (backup): ", error);
        return;
      } else {
        console.log("Users table (backup) created successfully.");
      }
    });
  }
}

module.exports = new usersBackupTable();
