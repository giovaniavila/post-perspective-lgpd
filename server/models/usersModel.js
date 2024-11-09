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
        VALUES (?, ?, ?, ?, ?, ?, ?, NOW()); 
      `;

      const params = [
        newUser.username,
        newUser.full_name,
        newUser.admin,
        newUser.profession,
        newUser.birthplace,
        newUser.email,
        hashedPassword,
        newUser.terms_accpeted
      ];

      return this.executeQuery(sql, params);

    } catch (error) {
      console.error("Error creating user: ", error.message);
      throw new Error("Error creating user: " + error.message);
    }
  }

  readUser() {
    const sql = "SELECT * FROM users";

    return this.executeQuery(sql);
  }

  readUserById(id) {
    const sql = "SELECT * FROM users WHERE id = ?";
    return this.executeQuery(sql, [id]);
  }

  readUserByEmail(email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    return this.executeQuery(sql, [email])
  }

  updateUser(updatedUsers, id) {
    const sql = `
      UPDATE USERS SET 
        username = ?, 
        full_name = ?, 
        admin = ?, 
        profession = ?, 
        birthplace = ?, 
        email = ?, 
        password_hash = ?, 
        terms_accepted = ?,
        updated_at = NOW()
      WHERE id = ? ;
    `;

    const params = [
      updatedUsers.username,
      updatedUsers.full_name,
      updatedUsers.admin,
      updatedUsers.profession,
      updatedUsers.birthplace,
      updatedUsers.email,
      updatedUsers.password_hash,
      updatedUsers.terms_accpeted,
      id,
    ];

    return this.executeQuery(sql, params)

  }

  deleteUser(id) {
    const sql = `DELETE FROM users WHERE id = ? ;`;

    this.backupUser(id)

    return this.executeQuery(sql, id);
  }
  
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
