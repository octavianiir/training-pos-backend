const { Op } = require("sequelize");
const ArrayCompare = require("../../../utils/ArrayProcess/ArrayCompare");
const { ERROR_FAILED_TO_PROCESS } = require("../../../utils/Constants/ErrorMessage");
const Loggers = require("../../../utils/Loggers");

module.exports = async (dbmodel, table, fieldPointers = [], data) => {
  try {
    let dataCreate = [...data];
    let dataExist = [];
 
    let orClause = data.map(e => {
      let x = {};
      for (const f of fieldPointers) {
        x[f] = e[f];
      };
      return x;
    });

    whereClause = {[Op.or]: orClause}

    const existingGet = await dbmodel[table].findAll({ where: whereClause, raw: true });

    if (existingGet.length > 0) {
      const compare = ArrayCompare(existingGet, data, [...fieldPointers]);
      dataCreate = compare.array_add;
      dataExist = compare.array_exist;
    }

    let separator = "|x*x|"
    let dataCreateProcessed = [...new Set(dataCreate.map(e => {
      let x = [];
      for (const f of fieldPointers) x.push(e[f]);
      return x.join(separator);
    }))].map(e => {
      let x = {};
      for (const f in fieldPointers) {
        x[fieldPointers[f]] = e.split(separator)[f];
      }
      return x
    });

    let created = [];
    if (dataCreate.length > 0) {
      const targetCreate = await dbmodel[table].bulkCreate(dataCreateProcessed);
      if (!targetCreate) throw ERROR_FAILED_TO_PROCESS;
      created = await dbmodel[table].findAll({ where: {id: targetCreate.map(e => e.id)}, raw: true });
    }

    let result = [...dataExist, ...created];
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}