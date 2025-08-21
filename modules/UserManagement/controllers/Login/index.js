const { return_login } = require("../../../../utils/ApiHandler/ReturnHandler");
const { error_badrequest } = require("../../../../utils/ApiHandler/ErrorHandler");
const LoginController = require("./LoginController");

module.exports = {
  Login: (req, res) => loginHandler(req, res),
}

async function loginHandler(req, res) {
  const result = await LoginController(req);
  if (result.error) return error_badrequest(res, result.error);
  return_login(res, result.user, result.token);
}