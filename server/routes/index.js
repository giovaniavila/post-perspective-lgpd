const usersRoute = require("./usersRoute");
const postsRoute = require("./postsRoute");
const commentsRoute = require("./commentsRoute");
const termsAndConditionsRoute = require("./termsAndConditionsRoute")
const login = require("./login")

module.exports = (app, express) => {
  //essa ordem é importante
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(usersRoute);
  app.use(postsRoute);
  app.use(commentsRoute);
  app.use(termsAndConditionsRoute);
  app.use(login)
};
