const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");


//comandos relacionados ao backup
const cron = require('node-cron');
const { createPeriodicBackup } = require('./backup/periodicBackup');
const { periodicBackupInterval } = require('./backup/backupConfig');

cron.schedule(periodicBackupInterval, () => {
  console.log('Iniciando backup periódico...');
  createPeriodicBackup();
});
//---------------------------------


const connection = require("./infra/connection");

const usersTable = require("./infra/usersTable");
const postsTable = require("./infra/postsTable");
const commentsTable = require("./infra/commentsTable");
const termsAndConditionsTable = require("./infra/termsAndConditionsTable");

const routes = require("./routes/index");

app.use(cors());
require('dotenv').config();

routes(app, express);

connection.connect((error) => {
  if (error) {
    console.log("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the db");

  usersTable.init(connection);
  postsTable.init(connection);
  commentsTable.init(connection);
  termsAndConditionsTable.init(connection);

  app.listen(port, (error) => {
    if (error) {
      console.log("Error", error);
      return;
    }
    console.log(`App running on port: ${port}`);
  });
});
