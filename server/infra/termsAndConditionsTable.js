class termsAndConditionsTable {
    init(connection) {
      this.connection = connection;
      this.createTableTermsAndConditions();
    }
  
    createTableTermsAndConditions() {
      const sql = `
        CREATE TABLE IF NOT EXISTS TERMS_AND_CONDITIONS (
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            version INT NOT NULL DEFAULT 1 UNIQUE
        );
      `
  
      this.connection.query(sql, (error) => {
        if (error) {
          console.log("Error creating Terms&Conditions table: ", error);
          return;
        } else {
          // console.log("Terms&Conditions  table created successfully.");
        }
      });
    }
  }
  
  module.exports = new termsAndConditionsTable();
  