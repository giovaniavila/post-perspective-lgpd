const connection = require("../infra/connection");
const connection2 = require("../infra/connection2");
const bcrypt = require("bcryptjs");

class usersModel {
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

  executeQueryBackup(sql, parametros = "") {
    return new Promise((resolve, reject) => {
      connection2.query(sql, parametros, (error, answer) => {
        if (error) {
          return reject(error);
        }
        return resolve(answer);
      });
    });
  }
  
  validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createUser(newUser) {
    try {
      const hashedPassword = await bcrypt.hash(newUser.password_hash, 10);

      const sql = `INSERT INTO USERS (username, full_name, admin, profession, birthplace, email, password_hash, terms_accepted, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW()); 
      `;

      const params = [
        newUser.username,
        newUser.full_name,
        newUser.admin,
        newUser.profession,
        newUser.birthplace,
        newUser.email,
        hashedPassword,
        newUser.terms_accepted
      ];

      return this.executeQuery(sql, params);

    } catch (error) {
      console.error("Error creating user: ", error.message);
      throw new Error("Error creating user: " + error.message);
    }
  }

  //returns all of the users
  readUser() {
    const sql = "SELECT * FROM users";

    return this.executeQuery(sql);
  }

  //returns ONE user, looking for it's id
  readUserById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return this.executeQuery(sql, [id]);
  }

  //returns ONE user, by it's email attribute
  readUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    return this.executeQuery(sql, [email])
  }

  //does the same that 'readUserByEmail'
  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      connection.query(sql, [email], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  }

  //dynamically updates the user's attributes
  async updateUser(updatedUsers, id) {
    try {
        // Array para armazenar partes da consulta SQL
        const fields = [];
        const params = [];

        // Adiciona os campos a serem atualizados dinamicamente
        if (updatedUsers.username !== undefined) {
            fields.push('username = ?');
            params.push(updatedUsers.username);
        }
        if (updatedUsers.full_name !== undefined) {
            fields.push('full_name = ?');
            params.push(updatedUsers.full_name);
        }
        if (updatedUsers.admin !== undefined) {
            fields.push('admin = ?');
            params.push(updatedUsers.admin);
        }
        if (updatedUsers.profession !== undefined) {
            fields.push('profession = ?');
            params.push(updatedUsers.profession);
        }
        if (updatedUsers.birthplace !== undefined) {
            fields.push('birthplace = ?');
            params.push(updatedUsers.birthplace);
        }
        if (updatedUsers.email !== undefined) {
            fields.push('email = ?');
            params.push(updatedUsers.email);
        }
        if (updatedUsers.password_hash !== undefined) {
            // Hash da nova senha antes de atualizar
            const hashedPassword = await bcrypt.hash(updatedUsers.password_hash, 10);
            fields.push('password_hash = ?');
            params.push(hashedPassword);
        }
        if (updatedUsers.terms_accepted !== undefined) {
            fields.push('terms_accepted = ?');
            params.push(updatedUsers.terms_accepted);
        }

        // Adiciona a atualização do campo `updated_at`
        fields.push('updated_at = NOW()');

        // Monta a consulta SQL dinamicamente
        const sql = `
          UPDATE USERS 
          SET ${fields.join(', ')}
          WHERE id = ?;
        `;

        // Adiciona o ID ao final dos parâmetros
        params.push(id);

        // Executa a consulta
        return this.executeQuery(sql, params);
    } catch (error) {
        console.error("Error updating user: ", error.message);
        throw new Error("Error updating user: " + error.message);
    }
  }

  //deletes the user and calls the backupUser function
  deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ? ;`;

    this.backupUser(id)

    return this.executeQuery(sql, id);
  }
  
  //saves the id and deleted_at attributes in a second table, within a second database
  backupUser(id) {
    const sql = `
      INSERT INTO users_backup 
        (id, deleted_at)
      VALUES (?, NOW()); 
    `;

    return this.executeQueryBackup(sql, id)

  }
}

module.exports = new usersModel();
