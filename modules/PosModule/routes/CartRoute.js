const { CartGet, CartPost, CartPut, CartDelete } = require("../controllers/Cart")

module.exports = (router) => {
  router.get('/cart', CartGet);
  router.post('/cart', CartPost);
  router.put('/cart/:id', CartPut);
  router.delete('/cart/:id',CartDelete);
}