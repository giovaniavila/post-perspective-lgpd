class postsTable {

    init(connection) {
        this.connection = connection;
        this.createTablePosts();
    }

    createTablePosts(){
        const sql = `
            CREATE TABLE IF NOT EXISTS POSTS (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL
            );
        
        `

        this.connection.query(sql, (error) => {
            if (error) {
                console.log("Error creating Posts table: ", error);
                return;
            } else {
                console.log("Posts table created successfully.");
            }
        });
    }

}

module.exports = new postsTable();