const connection = require('../infra/connection');

class postsModel {

  // this function executes all SQL queries. create a method, writes the query and call it inside the method
  // passing the parameters it needs.
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
      INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW());
    `;
        
    const params = [
      newPost.title,
      newPost.content  
    ];
    
    return this.executeQuery(sql, params);
  }
    
  readPosts() {
    const sql = "SELECT * FROM posts";
          
    return this.executeQuery(sql);
  }
    
  readPostByID(id) {
    const sql = "SELECT * FROM posts WHERE id = ?";
    return this.executeQuery(sql, [id]);
  }

  updatePost(updatedPost, id) {
    const sql = `
      UPDATE posts SET 
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
    const sql = "DELETE FROM posts WHERE id = ? ;";
    
    return this.executeQuery(sql, id);
  }
}

module.exports = new postsModel;