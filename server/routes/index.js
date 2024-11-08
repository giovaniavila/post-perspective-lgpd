const usersRoute = require("./usersRoute");
const postsRoute = require("./postsRoute");
const commentsRoute = require("./commentsRoute");
const login = require("./login")

module.exports = (app, express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(usersRoute);
  app.use(postsRoute);
  app.use(commentsRoute);
  app.use(login)
};
