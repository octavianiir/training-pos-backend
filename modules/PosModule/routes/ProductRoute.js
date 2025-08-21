const { ProductGet, ProductPost, ProductPut, ProductDelete } = require("../controllers/Product")
const TokenChecking = require("../../Middleware/controllers/TokenChecking")
const RoleChecking = require("../../Middleware/controllers/RoleChecking")

module.exports = (router) => {
  router.get('/product', ProductGet);
  router.post('/product', TokenChecking, RoleChecking, ProductPost);
  router.put('/product/:id', TokenChecking, RoleChecking, ProductPut);
  router.delete('/product/:id', TokenChecking, RoleChecking, ProductDelete);
}