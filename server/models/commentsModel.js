const connection = require('../infra/connection');

class commentsModel {

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

  createComment(newComment) {
    const sql = `
      INSERT INTO comments 
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
    
  // return all comments in the "comments" table
  readComments() {
    const sql = "SELECT * FROM comments";
        
    return this.executeQuery(sql);
  }
  
  //return all comments that has a specific post_id
  readCommentsByPostID(post_id) {
    const sql = `
        SELECT 
            c.id AS comment_id,
            c.content AS comment_content,
            c.created_at AS comment_created_at,
            u.id AS user_id,
            u.username,
            u.full_name,
            u.profession,
            u.email,
            u.birthplace
        FROM 
            COMMENTS c
        INNER JOIN 
            USERS u ON c.user_id = u.id
        WHERE 
            c.post_id = ? 
            AND c.deleted_at IS NULL;
    `;
    return this.executeQuery(sql, [post_id]);
}

  updateComment(updatedComment, id) {
    const sql = `
      UPDATE comments SET 
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
    const sql = "DELETE FROM comments WHERE id = ? ;";
  
    return this.executeQuery(sql, id);
  }

}

module.exports = new commentsModel;