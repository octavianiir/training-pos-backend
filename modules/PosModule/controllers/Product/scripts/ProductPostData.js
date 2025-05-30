const { models } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const AvoidDuplicate = require("../../../constants/AvoidDuplicate");
const { TB_PRODUCT } = require("../../../constants/TableConstants");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  const fieldPointer = ["product_name", "product_price"];
  const table = TB_PRODUCT;

  try {
    let result = await AvoidDuplicate(dbmodel, table, fieldPointer, data);
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}