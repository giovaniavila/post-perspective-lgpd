const connection = require('../infra/connection');

class commentsModel {

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

    createComment(newComment) {
        const sql = `
          INSERT INTO COMMENTS 
            (user_id, post_id, content, created_at)
          VALUES (?, ?, ?, NOW());
        `;
        
        const params = [
          newComment.user_id,
          newComment.post_id,
          newComment.content
        ];
    
        return this.executeQuery(sql, params);
      }
    
      readComments() {
        const sql = "SELECT * FROM COMMENTS";
          
        return this.executeQuery(sql);
      }
    
      updateComment(updatedComment, id) {
        const sql = `
          UPDATE COMMENTS SET 
            content = ?, 
            updated_at = NOW()
          WHERE id = ? ;
        `;
        
        const params = [
          updatedComment.content,
          id
        ];
    
        return this.executeQuery(sql, params);
      }
    
      deleteComment(id) {
        const sql = "DELETE FROM COMMENTS WHERE id = ? ;";
    
        return this.executeQuery(sql, id);
      }


}

module.exports = new commentsModel;