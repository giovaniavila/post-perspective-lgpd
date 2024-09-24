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
            created_at TIMESTAMP,
            updated_at TIMESTAMP,
            deleted_at TIMESTAMP 
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