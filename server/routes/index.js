const usersRoute = require("./usersRoute");
const postsRoute = require("./postsRoute");
const commentsRoute = require("./commentsRoute")

module.exports = (app, express) => {

    //essa ordem é importante
    app.use(express.json());
    app.use(express.urlencoded({ extended:true }))
    app.use(usersRoute);
    app.use(postsRoute);
    app.use(commentsRoute);
}