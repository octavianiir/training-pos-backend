const { Login } = require("../controllers/Login")

module.exports = (router) => {
  router.post("/login", Login)
}