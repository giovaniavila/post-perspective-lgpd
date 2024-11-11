require("dotenv").config();

const mysql = require("mysql2");

const connection2 = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE_2,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

module.exports = connection2;