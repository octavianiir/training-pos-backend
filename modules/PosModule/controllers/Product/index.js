const { error_badrequest } = require("../../../../utils/ApiHandler/ErrorHandler");
const { return_success, return_created } = require("../../../../utils/ApiHandler/ReturnHandler");
const ProductGetController = require("./ProductGetController");
const ProductPostController = require("./ProductPostController");
const ProductPutController = require("./ProductPutController");
const ProductDeleteController = require("./ProductDeleteController");

module.exports = {
  ProductGet: (req, res) => ctrlHndlr(ProductGetController, req, res),
  ProductPost: (req, res) => ctrlHndlr(ProductPostController, req, res, true),
  ProductPut: (req, res) => ctrlHndlr(ProductPutController, req, res),
  ProductDelete: (req, res) => ctrlHndlr(ProductDeleteController, req, res),
}

async function ctrlHndlr(controller, req, res, created = false) {
  const result = await controller(req, res);
  if (result.error) return error_badrequest(res, result.error);
  created ? return_created(res, result) : return_success(res, result);
}