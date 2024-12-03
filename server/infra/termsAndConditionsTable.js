class termsAndConditionsTable {
  init(connection) {
    this.connection = connection;
    this.createTableTermsAndConditions();
  }

  // Criação da tabela TERMS_AND_CONDITIONS
  createTableTermsAndConditions() {
    const sql = `
      CREATE TABLE IF NOT EXISTS TERMS_AND_CONDITIONS (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version DECIMAL(10, 1)
      );
    `;
    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating Terms&Conditions table: ", error);
        return;
      }
    });
  }

  
}

module.exports = new termsAndConditionsTable();
