const { models } = require("../../../../../database/Sequelize");
const { ERROR_WRONG_FORMAT, ERROR_NO_DATA } = require("../../../../../utils/Constants/ErrorMessage");
const Loggers = require("../../../../../utils/Loggers");
const { TB_CART } = require("../../../constants/TableConstants");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  try {
    if (!Array.isArray(data)) throw ERROR_WRONG_FORMAT;
    if (data.length == 0) throw ERROR_NO_DATA;

    let promises = [];
    data.forEach(async (e) => {
      let putData = {...e};
      promises.push(dbmodel[TB_CART].update(putData, { where: { id: e.id } }));
    });

    const result = await Promise.all(promises);
    if (!result) throw "Failed to update cart";
    
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}