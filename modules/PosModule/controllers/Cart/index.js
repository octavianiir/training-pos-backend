const { error_badrequest } = require("../../../../utils/ApiHandler/ErrorHandler");
const { return_success, return_created } = require("../../../../utils/ApiHandler/ReturnHandler");
const CartGetController = require("./CartGetController");
const CartPostController = require("./CartPostController");
const CartPutController = require("./CartPutController");
const CartDeleteController = require("./CartDeleteController");

module.exports = {
  CartGet: (req, res) => ctrlHndlr(CartGetController, req, res),
  CartPost: (req, res) => ctrlHndlr(CartPostController, req, res, true),
  CartPut: (req, res) => ctrlHndlr(CartPutController, req, res),
  CartDelete: (req, res) => ctrlHndlr(CartDeleteController, req, res),
}

async function ctrlHndlr(controller, req, res, created = false) {
  const result = await controller(req, res);
  if (result.error) return error_badrequest(res, result.error);
  created ? return_created(res, result) : return_success(res, result);
}