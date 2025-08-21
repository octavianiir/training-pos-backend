const { QueryTypes } = require("sequelize");
const { connection } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const { TB_USERS, TB_PERMISSIONS, TB_ROUTES, TB_ROLES } = require("../../../constants/TableConstants");
const { ERROR_FAILED_TO_PROCESS, ERROR_NO_DATA } = require("../../../../../utils/Constants/ErrorMessage");

module.exports = async (db = null, filter = {}) => {
  let dbconn = connection;
  if (db) dbconn = db.connection;

  try {
    let whereclause = "";
    let replacements = [];

    if (filter.id) {
      whereclause += ` AND u.id = ?`;
      replacements.push(filter.id);
    }

    if (filter.username) {
      whereclause += ` AND u.username = ?`;
      replacements.push(filter.username);
    }

    const permissions = `
    SELECT 
      p.role_id
      , JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', p.id
          , 'path', r.path
          , 'method', r.method
        )
      ) permission
    FROM ${TB_PERMISSIONS} p
    LEFT JOIN ${TB_ROUTES} r
      ON r.id = p.route_id
    GROUP BY p.role_id`;

    let query = `SELECT
      u.*
      , r.rolename
      , p.permission
    FROM ${TB_USERS} u
    LEFT JOIN ${TB_ROLES} r
      ON r.id = u.role_id
    LEFT JOIN (${permissions}) p
      ON p.role_id = u.role_id
    WHERE 1=1
    ${whereclause}`;

    const result = await connection.query(query, { replacements, raw: true, type: QueryTypes.SELECT });
    if (!result) throw ERROR_FAILED_TO_PROCESS;
    if (result.length == 0) throw ERROR_NO_DATA;
    if (filter.id || filter.username) return result[0];
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}