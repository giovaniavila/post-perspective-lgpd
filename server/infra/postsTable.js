const pool = require('../infra/connection');

class postsTable {
    init () {
        this.createPostsTable();
    }

    createPostsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS POSTS (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW(),
                deleted_at TIMESTAMP DEFAULT NULL
            );

        `
        pool.query(sql, (error, result) => {
            if(error) {
                console.log("Error creating Posts table: ", error);
                return;
            } 
            console.log("Posts table created successfully.")
            
        });
    }
}

module.exports = new postsTable();