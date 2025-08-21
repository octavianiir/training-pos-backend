const Loggers = require("../../../../utils/Loggers");
const RolesPutData = require("./scripts/RolesPutData");

module.exports = async (req) => {
  try {
    const body = req.body;
    const id = req.params.id;
    let data = [];
    let result;
    if (id) data.push({...body, id: id});
    result = await RolesPutData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}