const connection = require("../infra/connection");

class termsAndCoditionsModel {
  executeQuery(sql, parametros = "") {
    return new Promise((resolve, reject) => {
      connection.query(sql, parametros, (error, answer) => {
        if (error) {
          return reject(error);
        }
        return resolve(answer);
      });
    });
  }

  createTerms(newTerms) {
    const sql = `
          INSERT INTO terms_and_conditions (title, content, created_at)
          VALUES (?, ?, NOW());
      `;

    const params = [newTerms.title, newTerms.content];

    return this.executeQuery(sql, params);
  }

  readTerms() {
    const sql = "SELECT * FROM terms_and_conditions";

    return this.executeQuery(sql);
  }

  // async updateTerms(updatedTerms, id) {
  //     try {
  //         // Array para armazenar partes da consulta SQL
  //         const fields = [];
  //         const params = [];

  //         // Adiciona os campos a serem atualizados dinamicamente
  //         if (updatedTerms.title !== undefined) {
  //             fields.push('title = ?');
  //             params.push(updatedTerms.title);
  //         }
  //         if (updatedTerms.content !== undefined) {
  //             fields.push('content = ?');
  //             params.push(updatedTerms.content);
  //         }

  //         // Adiciona a atualização do campo `updated_at`
  //         fields.push('updated_at = NOW()');

  //         // Monta a consulta SQL dinamicamente
  //         const sql = `
  //           UPDATE terms_and_conditions
  //           SET ${fields.join(', ')}
  //           WHERE id = ?;
  //         `;

  //         // Adiciona o ID ao final dos parâmetros
  //         params.push(id);

  //         // Executa a consulta
  //         return this.executeQuery(sql, params);
  //     } catch (error) {
  //         console.error("Error updating terms and conditions: ", error.message);
  //         throw new Error("Error updating terms and conditions: " + error.message);
  //     }
  // }
}

module.exports = new termsAndCoditionsModel();
