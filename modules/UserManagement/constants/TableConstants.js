const Permissions = require("../tables/Permissions");
const Roles = require("../tables/Roles");
const Routes = require("../tables/Routes");
const Users = require("../tables/Users");

const TB_ROLES = Roles.table;
const TB_ROUTES = Routes.table;
const TB_PERMISSIONS = Permissions.table;
const TB_USERS = Users.table;

module.exports = {
  TB_ROLES, TB_ROUTES, TB_PERMISSIONS, TB_USERS
}