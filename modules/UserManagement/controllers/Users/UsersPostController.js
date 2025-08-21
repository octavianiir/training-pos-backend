const Loggers = require("../../../../utils/Loggers");
const UsersPostData = require("./scripts/UsersPostData");

module.exports = async (req) => {
  try {
    const data = req.body;
    const result = await UsersPostData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}