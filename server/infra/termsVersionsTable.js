class termnVersionsTable {
    init(connection) {
      this.connection = connection;
      this.createTableTermsVersions();  // Criação da tabela terms_versions
      // this.createTriggerForTermsAndConditions();  // Criação do trigger
    }

    // Criação da tabela terms_versions
  createTableTermsVersions() {
    const sql = `
      CREATE TABLE IF NOT EXISTS terms_versions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        terms_id INT NOT NULL,
        version DECIMAL(10, 1) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (terms_id) REFERENCES TERMS_AND_CONDITIONS(id)
      );
    `;

    this.connection.query(sql, (error) => {
      if (error) {
        console.log("Error creating terms_versions table: ", error);
        return;
      }
    });
  }

  // Criação do Trigger para inserir uma versão sempre que um novo termo for adicionado
  // createTriggerForTermsAndConditions() {
  //   const triggerSQL = `
  //   CREATE TRIGGER after_insert_terms
  //   AFTER INSERT ON TERMS_AND_CONDITIONS
  //   FOR EACH ROW
  //   BEGIN
  //       DECLARE max_version DECIMAL(10, 1);

  //       -- Obtém a maior versão existente na tabela de versões
  //       SELECT MAX(version) INTO max_version FROM terms_versions;

  //       -- Define a nova versão: inicia com 1.0 se não houver versões ou incrementa em 0.1
  //       IF max_version IS NULL THEN
  //           SET max_version = 1.0;
  //       ELSE
  //           SET max_version = max_version + 0.1;
  //       END IF;

  //       -- Insere a nova versão na tabela terms_versions
  //       INSERT INTO terms_versions (terms_id, version, created_at)
  //       VALUES (NEW.id, max_version, NOW());

  //       -- Atualiza todos os usuários, definindo o campo terms_accepted como 0 (falso)
  //       UPDATE users SET terms_accepted = 0;
  //   END;
  //   `;

  //   this.connection.query(triggerSQL, (error) => {
  //     if (error) {
  //       console.log("Error creating trigger for Terms & Conditions: ", error);
  //     } else {
  //       console.log("Trigger for Terms & Conditions created successfully.");
  //     }
  //   });
  // }
}
module.exports = new termnVersionsTable();