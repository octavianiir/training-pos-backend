const Loggers = require("../../../../utils/Loggers");
const RolesDeleteData = require("./scripts/RolesDeleteData");

module.exports = async (req) => {
  try {
    const id = req.params.id;
    let data = [];
    if (id) data.push({ id: id });
    const result = await RolesDeleteData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}