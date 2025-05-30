const { error_badrequest } = require("./ErrorHandler");
const { return_created, return_success } = require("./ReturnHandler");

module.exports = {
  ctrlHndlr: controllerHandler
}

async function controllerHandler(controller, req, res, created = false) {
  const result = await controller(req);
  if (result.error) return error_badrequest(res, result.error);
  created ? return_created(res, result) : return_success(res, result);
}