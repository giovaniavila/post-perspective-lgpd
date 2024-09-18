const connection = require('../infra/connection');

class commentsModel {

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

    createComment (newComment) { 
        const sql = `
            INSERT INTO COMMENTS (user_id, post_id, content, created_at)
            VALUES ($1, $2, $3, NOW()) 
            RETURNING * ;
        `;
        
        const params = [newComment.user_id, newComment.post_id, newComment.content];

        return this.executeQuery(sql, params)

    }

    readComments () {
        const sql = `SELECT * FROM COMMENTS; `;

        return this.executeQuery(sql)
    }

    updateComment (commentToUpdate, id) {
        const sql = `
            UPDATE COMMENTS 
            SET user_id = $1, post_id = $2, content = $3, updated_at = NOW()
            WHERE id = $4
            RETURNING * ;
        `;
        
        const params = [commentToUpdate.user_id, commentToUpdate.post_id, commentToUpdate.content, id];

        return this.executeQuery(sql, params);
    }

    deleteComment (id) {
        const sql = `DELETE FROM COMMENTS WHERE id = $1 RETURNING * ; `;  
        const params = [id];

        return this.executeQuery(sql, params);
    }
}

module.exports = new commentsModel();