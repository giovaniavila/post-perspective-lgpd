const pool = require('../infra/connection');

class usersTable {
    init () {
        this.createUsersTable();
    }

    createUsersTable() {
        const sql = `

            CREATE TABLE IF NOT EXISTS USERS (
            id SERIAL PRIMARY KEY,
            role VARCHAR(10) NOT NULL CHECK (role IN ('admin', 'user')),
            birthplace VARCHAR(50),
            profession  VARCHAR(30),
            username VARCHAR(50) NOT NULL UNIQUE,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL UNIQUE,
            password_hash VARCHAR(255) NOT NULL,
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP 
        );
        
        `
        pool.query(sql, (error, result) => {
            if(error) {
                console.log("Error creating Users table: ", error);
                return;
            } else {
                console.log("Users table created successfully.");
            }
        });
    }
}



module.exports = new usersTable();