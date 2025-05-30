const { models } = require("../../../../../database/Sequelize");
const { ERROR_WRONG_FORMAT, ERROR_NO_DATA } = require("../../../../../utils/Constants/ErrorMessage");
const Loggers = require("../../../../../utils/Loggers");
const { TB_PRODUCT } = require("../../../constants/TableConstants");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  try {
    if (!Array.isArray(data)) throw ERROR_WRONG_FORMAT;
    if (data.length == 0) throw ERROR_NO_DATA;
    const ids = data.map(e => e.id);
    const result = await dbmodel[TB_PRODUCT].destroy({ where: { id: ids } });
    if (!result) throw "Failed to delete product";
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}