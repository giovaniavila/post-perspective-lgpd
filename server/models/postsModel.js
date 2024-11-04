const connection = require('../infra/connection');

class postsModel {
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

    createPost(newPost) {
        const sql = `
          INSERT INTO POSTS 
            (title, content, created_at)
          VALUES (?, ?, NOW());
        `;
        
        const params = [
          newPost.title,
          newPost.content  
        ];
    
        return this.executeQuery(sql, params);
      }
    
      readPosts() {
        const sql = "SELECT * FROM POSTS";
          
        return this.executeQuery(sql);
      }
    
      updatePost(updatedPost, id) {
        const sql = `
          UPDATE POSTS SET 
            title = ?, 
            content = ?, 
            updated_at = NOW()
          WHERE id = ? ;
        `;
        
        const params = [
          updatedPost.title,
          updatedPost.content,
          id
        ];
    
        return this.executeQuery(sql, params);
      }
    
      deletePost(id) {
        const sql = "DELETE FROM POSTS WHERE id = ? ;";
    
        return this.executeQuery(sql, id);
      }

}

module.exports = new postsModel;