const { Pool } = require("pg");

const pool = new Pool({
    host: 'localhost',            
    port: 5432,          
    database: 'blog_db',            
    user: 'postgres',           
    password: '12344321',            
    
})

module.exports = pool;