const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
require('dotenv').config();

const connection = require("./infra/connection");
const usersTable = require("./infra/usersTable");
const postsTable = require("./infra/postsTable");
const commentsTable = require("./infra/commentsTable");

const connection2 = require("./infra/connection2");
const usersBackupTable = require("./infra/usersBackupTable")

const routes = require("./routes/index");
routes(app, express);

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the db");

  usersTable.init(connection);
  usersBackupTable.init(connection2);
  postsTable.init(connection);
  commentsTable.init(connection);

  app.listen(port, (error) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    console.log(`App running on port: ${port}`);
  });
});
