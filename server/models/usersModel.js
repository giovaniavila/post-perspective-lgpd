const connection = require('../infra/connection');

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

  createUser(newUser) {
    const sql = `
      INSERT INTO users 
        (username, 
        full_name, 
        admin, 
        profession, 
        birthplace, 
        email, 
        password_hash, 
        terms_accepted, 
        created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW()); 
      `;
    
    const params = [
      newUser.username,
      newUser.full_name,
      newUser.admin,
      newUser.profession,
      newUser.birthplace,
      newUser.email,
      newUser.terms_accepted,
      newUser.password_hash  
    ];

    return this.executeQuery(sql, params);

  }

  readUser() {
    const sql = "SELECT * FROM users";
      
    return this.executeQuery(sql);
  }


  // método novo
  readUserByID(id) {
    const sql = `
        SELECT 
          id, 
          username, 
          full_name,  
          profession, 
          birthplace, 
          email, 
          terms_accepted,
          created_at, 
          updated_at, 
          deleted_at
        FROM users WHERE id = ?;
      `;
      
    return this.executeQuery(sql, id);
  }

  updateUser(updatedUsers, id) {
    const sql = `
      UPDATE users SET 
        username = ?, 
        full_name = ?, 
        admin = ?, 
        profession = ?, 
        birthplace = ?, 
        email = ?, 
        password_hash = ?, 
        terms_accepted,
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
      updatedUsers.terms_accepted,
      id
    ];

    return this.executeQuery(sql, params)
  }

  deleteUser(id) {
    const sql = `
      DELETE FROM users WHERE id = ? ;`

    return this.executeQuery(sql, id)

  }

}

module.exports = new usersModel;