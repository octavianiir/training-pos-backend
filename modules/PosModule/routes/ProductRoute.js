const { ProductGet, ProductPost, ProductPut, ProductDelete } = require("../controllers/Product")

module.exports = (router) => {
  router.get('/product', ProductGet);
  router.post('/product', ProductPost);
  router.put('/product/:id', ProductPut);
  router.delete('/product/:id',ProductDelete);
}