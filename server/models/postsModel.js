const connection = require('../infra/connection');

class postsModel {

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

    createPost (newPost) { 
        const sql = `
            INSERT INTO POSTS (title, content, updated_at)
            VALUES ($1, $2, NOW()) 
            RETURNING * ;
        `;
        
        const params = [newPost.title, newPost.content];

        return this.executeQuery(sql, params)

    }

    readPosts () {
        const sql = `SELECT * FROM POSTS; `;

        return this.executeQuery(sql)
    }

    updatePost (postToUpdate, id) {
        const sql = `
            UPDATE POSTS 
            SET title = $1, content = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING * ;
        `;
        
        const params = [postToUpdate.title, postToUpdate.content, id];

        return this.executeQuery(sql, params);
    }

    deletePost (id) {
        const sql = `DELETE FROM POSTS WHERE id = $1 RETURNING * ; `;  
        const params = [id];

        return this.executeQuery(sql, params);
    }
}

module.exports = new postsModel();