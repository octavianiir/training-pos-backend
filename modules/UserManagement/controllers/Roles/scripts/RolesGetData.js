const { QueryTypes } = require("sequelize");
const { connection } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const { TB_ROLES } = require("../../../constants/TableConstants");
// const { ERROR_WRONG_FORMAT } = require("../../../../../utils/Constants/ErrorMessage");

module.exports = async (db = null, filter = {}) => {
  let dbconn = connection;
  if (db) dbconn = db.connection;

  try {
    let selectclause = "";
    let joinclause = "";
    let whereclause = "";
    let replacements = [];
    let groupbyclause = "";

    selectclause = `${TB_ROLES}.id
      , ${TB_ROLES}.rolename`;

    if (filter.id) {
      whereclause += ` AND ${TB_ROLES}.id = ?`;
      replacements.push(filter.id);
    }

    let sql =  `SELECT
      ${selectclause}
    FROM ${TB_ROLES}
    WHERE 1=1 ${whereclause}`;

    let result = await dbconn.query(sql, { replacements, type: QueryTypes.SELECT, raw: true });
    if (!result) throw "Failed to fetch product";
    if (filter.id) return result[0] ?? {};
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}
