const { error_badrequest } = require("../../../../utils/ApiHandler/ErrorHandler");
const { return_success, return_created } = require("../../../../utils/ApiHandler/ReturnHandler");
const UserstGetController = require("./UsersGetController");
const UsersPostController = require("./UsersPostController");
const UsersPutController = require("./UsersPutController");
const UsersDeleteController = require("./UsersDeleteController");

module.exports = {
  UsersGet: (req, res) => ctrlHndlr(UserstGetController, req, res),
  UsersPost: (req, res) => ctrlHndlr(UsersPostController, req, res, true),
  UsersPut: (req, res) => ctrlHndlr(UsersPutController, req, res),
  UsersDelete: (req, res) => ctrlHndlr(UsersDeleteController, req, res),
}

async function ctrlHndlr(controller, req, res, created = false) {
  const result = await controller(req, res);
  if (result.error) return error_badrequest(res, result.error);
  created ? return_created(res, result) : return_success(res, result);
}