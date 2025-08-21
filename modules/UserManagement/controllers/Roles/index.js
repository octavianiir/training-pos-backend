const { error_badrequest } = require("../../../../utils/ApiHandler/ErrorHandler");
const { return_success, return_created } = require("../../../../utils/ApiHandler/ReturnHandler");
const RolesGetController = require("./RolesGetController");
const RolesPostController = require("./RolesPostController");
const RolesPutController = require("./RolesPutController");
const RolesDeleteController = require("./RolesDeleteController");

module.exports = {
  RolesGet: (req, res) => ctrlHndlr(RolesGetController, req, res),
  RolesPost: (req, res) => ctrlHndlr(RolesPostController, req, res, true),
  RolesPut: (req, res) => ctrlHndlr(RolesPutController, req, res),
  RolesDelete: (req, res) => ctrlHndlr(RolesDeleteController, req, res),
}

async function ctrlHndlr(controller, req, res, created = false) {
  const result = await controller(req, res);
  if (result.error) return error_badrequest(res, result.error);
  created ? return_created(res, result) : return_success(res, result);
}