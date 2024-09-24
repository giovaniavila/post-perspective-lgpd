const connection = require('../infra/connection');

class usersModel {

    executeQuery(sql, param = []) {
        return new Promise((resolve, reject) => {
            try {
                connection.query(sql, param, (error, answer) => {
                    if(error){
                        return reject(error);
                    }
                    return resolve(answer.rows);
                });
            } catch(error) {
                reject(error);
            }
        });
    }

    createUser (newUser) { 
        const sql = `
            INSERT INTO USERS (role, birthplace, profession, username, name, email, password_hash, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) 
            RETURNING * ;
        `;
        
        const params = [
            newUser.role, newUser.birthplace, newUser.profession,
            newUser.username, newUser.name, newUser.email, newUser.password_hash
        ];

        return this.executeQuery(sql, params)

    }

    readUser () {
        const sql = `SELECT * FROM USERS; `;

        return this.executeQuery(sql)
    }

    updateUser (userToUpdate, id) {
        const sql = `
            UPDATE USERS 
            SET role = $1, birthplace = $2, profession = $3, username = $4,
                name = $5, email = $6, password_hash = $7, updated_at = NOW()
            WHERE id = $8
            RETURNING * ;
        `;
        
        const params = [userToUpdate.role, userToUpdate.birthplace, userToUpdate.profession, 
            userToUpdate.username, userToUpdate.name, userToUpdate.email, userToUpdate.password_hash, id
        ];

        return this.executeQuery(sql, params);
    }

    deleteUser (id) {
        const sql = `
            UPDATE USERS
                SET role = 'removed', birthplace = 'removed', profession = 'removed', 
                username = 'removed', name = 'removed', email = 'removed', password_hash = 'removed', 
                deleted_at = NOW()
            WHERE id = $1
                RETURNING * ;
        `;
        
        const params = [id];

        return this.executeQuery(sql, params);
    }
}

module.exports = new usersModel();