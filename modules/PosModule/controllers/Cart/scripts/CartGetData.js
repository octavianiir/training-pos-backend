const { QueryTypes } = require("sequelize");
const { connection } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const { TB_CART, TB_PRODUCT } = require("../../../constants/TableConstants");
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

    selectclause = `${TB_CART}.id
      , ${TB_CART}.product_id
      , ${TB_CART}.quantity
      , ${TB_PRODUCT}.product_name
      , ${TB_PRODUCT}.product_price`;

    
    joinclause += `
      LEFT JOIN ${TB_PRODUCT}
        ON ${TB_PRODUCT}.id = ${TB_CART}.product_id`;

    if (filter.id) {
      whereclause += ` AND ${TB_CART}.id = ?`;
      replacements.push(filter.id);
    }

    
    if (filter.product_id) {
      whereclause += ` AND ${TB_CART}.product_id = ?`;
      replacements.push(filter.product_id);
    }

    let sql =  `SELECT
      ${selectclause}
    FROM ${TB_CART}
    ${joinclause}
    WHERE 1=1 ${whereclause}`;

    let result = await dbconn.query(sql, { replacements, type: QueryTypes.SELECT, raw: true });
    if (!result) throw "Failed to fetch cart";
    if (filter.id) return result[0] ?? {};
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}
