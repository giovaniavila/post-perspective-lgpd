const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')

const connection = require("./infra/connection");

const usersTable = require("./infra/usersTable");
const postsTable = require("./infra/postsTable");
const commentsTable = require("./infra/commentsTable");

const routes = require("./routes/index");
routes(app, express)

connection.connect((error) =>{
    if (error) {
        console.log("Error connecting to the database:", error);
        return;
    }
    console.log("Connected to the db")

    usersTable.init(connection)
    postsTable.init(connection)
    commentsTable.init(connection)

    app.listen(port, (error) => {
        if(error) {
            console.log("Error", error);
            return;
        }
        console.log(`App running on port: ${port}`)
    })
})



