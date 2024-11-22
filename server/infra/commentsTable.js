class commentsTable {

    init(connection) {
        this.connection = connection;
        this.createTableComments();
    }

    createTableComments(){
        const sql = `
            CREATE TABLE IF NOT EXISTS COMMENTS (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                post_id INT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
                deleted_at TIMESTAMP NULL DEFAULT NULL,
                FOREIGN KEY (user_id) REFERENCES USERS(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES POSTS(id) ON DELETE CASCADE
            ); 
            
        `

        this.connection.query(sql, (error) => {
            if (error) {
                console.log("Error creating Comments table: ", error);
                return;
            } else {
                console.log("Comments table created successfully.");
            }
        });
    }

}

module.exports = new commentsTable();