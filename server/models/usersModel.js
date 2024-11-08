const connection = require("../infra/connection");
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

  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      connection.query(sql, [email], (error, results) => {
        if (error) return reject(error);
        resolve(results[0]);
      });
    });
  }

  validatePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async createUser(newUser) {
    try {
      const hashedPassword = await bcrypt.hash(newUser.password_hash, 10);

      const sql = `
        INSERT INTO USERS 
          (username, full_name, admin, profession, birthplace, email, password_hash, created_at)
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
      ];

      return this.executeQuery(sql, params);
    } catch (error) {
      console.error("Erro ao criar usuário:", error.message);
      throw new Error("Erro ao criar usuário: " + error.message);
    }
  }
  readUser() {
    const sql = "SELECT * FROM USERS";

    return this.executeQuery(sql);
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
      id,
    ];

    return this.executeQuery(sql, params)

  }

  deleteUser(id) {
    const sql = `
        UPDATE USERS SET 
          username = 'removed', 
          full_name = 'removed', 
          admin = 0, 
          profession = 'removed', 
          birthplace = 'removed', 
          email = 'removed', 
          password_hash = 'removed', 
          deleted_at = NOW()
        WHERE id = ? ;`;

    return this.executeQuery(sql, id);
  }
}

module.exports = new usersModel();
