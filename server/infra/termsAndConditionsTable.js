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
            version DECIMAL(10, 1)
        );
      `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating Terms&Conditions table: ", error);
        return;
      } else {
      }
    });
  }

  createTriggerForTermsAndConditions() {
    const triggerSQL = `
    DELIMITER $$

CREATE TRIGGER after_insert_terms
AFTER INSERT ON terms_and_conditions
FOR EACH ROW
BEGIN
    DECLARE max_version DECIMAL(10, 1);

    -- Obtém a maior versão existente na tabela de versões
    SELECT MAX(version) INTO max_version FROM terms_versions;

    -- Define a nova versão: inicia com 1.0 se não houver versões ou incrementa em 0.1
    IF max_version IS NULL THEN
        SET max_version = 1.0;
    ELSE
        SET max_version = max_version + 0.1;
    END IF;

    -- Insere a nova versão na tabela terms_versions
    INSERT INTO terms_versions (terms_id, version, created_at)
    VALUES (NEW.id, max_version, NOW());
END$$

DELIMITER ;

      `;

    this.connection.query(triggerSQL, (error) => {
      if (error) {
        console.log("Error creating trigger for Terms & Conditions: ", error);
      } else {
        console.log("Trigger for Terms & Conditions created successfully.");
      }
    });
  }
}

module.exports = new termsAndConditionsTable();
