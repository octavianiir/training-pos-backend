const Loggers = require("../../../../utils/Loggers");
const RolesGetData = require("./scripts/RolesGetData");

module.exports = async (req) => {
  try {
    const query = req.query;
    const id = req.params.id;
    let filter = {...query};
    if (id) filter.id = id;
    const result = await RolesGetData(null, filter);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}