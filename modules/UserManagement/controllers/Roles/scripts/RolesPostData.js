const { models } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const AvoidDuplicate = require("../../../../PosModule/constants/AvoidDuplicate");
const { TB_ROLES } = require("../../../constants/TableConstants");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  const fieldPointer = ["rolename"];
  const table = TB_ROLES;

  try {
    let result = await AvoidDuplicate(dbmodel, table, fieldPointer, data);
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}