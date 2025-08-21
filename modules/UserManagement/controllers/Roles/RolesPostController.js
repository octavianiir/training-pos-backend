const Loggers = require("../../../../utils/Loggers");
const RolesPostData = require("./scripts/RolesPostData");

module.exports = async (req) => {
  try {
    const data = req.body;
    const result = await RolesPostData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}