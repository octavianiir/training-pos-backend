const { UsersGet, UsersPost, UsersPut, UsersDelete } = require("../controllers/Users")

module.exports = (router) => {
  router.get('/users', UsersGet);
  router.post('/users', UsersPost);
  router.put('/users/:id', UsersPut);
  router.delete('/users/:id', UsersDelete);
}