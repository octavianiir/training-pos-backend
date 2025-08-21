const { RolesGet, RolesPost, RolesPut, RolesDelete } = require("../controllers/Roles")

module.exports = (router) => {
  router.get('/roles', RolesGet);
  router.post('/roles', RolesPost);
  router.put('/roles/:id', RolesPut);
  router.delete('/roles/:id', RolesDelete);
}