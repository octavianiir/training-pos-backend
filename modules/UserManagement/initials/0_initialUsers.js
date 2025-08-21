const { models } = require("../../../database/Sequelize");
const ArrayCompare = require("../../../utils/ArrayProcess/ArrayCompare");
const { ERROR_FAILED_TO_PROCESS } = require("../../../utils/Constants/ErrorMessage");
const { GenerateHash } = require("../../../utils/Hash");
const Loggers = require("../../../utils/Loggers");
const { TB_ROLES, TB_ROUTES, TB_PERMISSIONS, TB_USERS } = require("../constants/TableConstants");
const { ROLE_ADMIN } = require("../constants/UserConstants");
const GeneratePasswordHash = require("../controllers/Login/scripts/GeneratePasswordHash");

module.exports = async (db = null, router) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  try {
    // check if role exist
    const checkRole = await isRoleExist(dbmodel);
    if (checkRole) { 
      console.log("role admin existed"); 
      return; 
    }

    // define role and permission
    await createRoutes(dbmodel, router);
    await createUserAdmin(dbmodel);
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

async function isRoleExist(dbmodel) {
  try {
    const findRoleAdmin = await dbmodel[TB_ROLES].findAll({ where: { rolename: ROLE_ADMIN }});
    let result = true;
    if (findRoleAdmin.length == 0) result = false;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

async function createRoutes(dbmodel, router) {
  try {
    let existingRoutes = await dbmodel[TB_ROUTES].findAll({ raw: true });
    let routes = router.stack
      .map(e => {
        let route = {};
        route.path = e.route.path;
        for (const [key, value] of Object.entries(e.route.methods)) {
          if (value) route.method = key;
        }
        return route;
      })
      .sort((a, b) => {
        if (a.route < b.route) return -1;
        if (a.route > b.route) return 1;
        return 0;
      });
    let compare = ArrayCompare(routes, existingRoutes, ["path", "method"]);
    await dbmodel[TB_ROUTES].bulkCreate(compare.array_add);
    return;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

async function createRoleAdmin(dbmodel) {
  try {
    const allRoute = await dbmodel[TB_ROUTES].findAll({ raw: true });
    const createRole = await dbmodel[TB_ROLES].create({ rolename: ROLE_ADMIN });
    const adminID = createRole.id;
    const createPermission = await dbmodel[TB_PERMISSIONS].bulkCreate(allRoute.map(e => {
      let data = {
        role_id: adminID,
        route_id: e.id,
      };
      return data;
    }));
    if (!createPermission) throw ERROR_FAILED_TO_PROCESS;
    return adminID;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

async function createUserAdmin(dbmodel) {
  const ADMIN_USERNAME = process.env.DEFAULT_ADMIN_USERNAME || "admin";
  const ADMIN_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD || "admin";
  try {
    const adminID = await createRoleAdmin(dbmodel);
    const createSalt = GenerateHash();
    const createPassword = GeneratePasswordHash(ADMIN_PASSWORD, createSalt);
    const adminData = {
      username: ADMIN_USERNAME,
      password: createPassword,
      salt: createSalt,
      role_id: adminID,
      name: ADMIN_USERNAME,
      is_active: true
    }
    const createUser = dbmodel[TB_USERS].create(adminData);
    if (!createUser) throw ERROR_FAILED_TO_PROCESS;
    return;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}