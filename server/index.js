const express = require("express");
const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())

const usersTable = require("./infra/usersTable");
const postsTable = require("./infra/postsTable");
const commentTable = require("./infra/commentsTable");

usersTable.init();
postsTable.init();
commentTable.init();

const routes = require("./routes/index");

routes(app, express)

app.get('/', (req, res) => {
    res.send('server running');
});

app.listen(port,(error) => {
    if(error) {
        console.log("Error", error);
        return;
    }
    console.log(`server running in the port: ${port}`)
});