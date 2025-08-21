const { CartGet, CartPost, CartPut, CartDelete } = require("../controllers/Cart")
const TokenChecking = require("../../Middleware/controllers/TokenChecking")
const RoleChecking = require("../../Middleware/controllers/RoleChecking")

module.exports = (router) => {
  router.get('/cart', CartGet);
  router.post('/cart', TokenChecking, RoleChecking, CartPost);
  router.put('/cart/:id', TokenChecking, RoleChecking, CartPut);
  router.delete('/cart/:id', TokenChecking, RoleChecking, CartDelete);
}