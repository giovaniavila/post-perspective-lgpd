const pool = require('../infra/connection');

class commentsTable {
    
    init () {    
        this.createCommentsTable();
    }

    createCommentsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS COMMENTS  (
            id SERIAL PRIMARY KEY,
            user_id INT NOT NULL REFERENCES USERS(id),
            post_id INT NOT NULL REFERENCES POSTS(id),
            content TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW(),
            deleted_at TIMESTAMP DEFAULT NULL
        );

        `
        pool.query(sql, (error, result) => {
            if(error) {
                console.log("Error creating Comments table: ", error);
                return;
            }
            console.log('Comments table created successfully.')
        });
    }
}

module.exports = new commentsTable();