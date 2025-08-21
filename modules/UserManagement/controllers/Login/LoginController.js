const { ERROR_WRONG_FORMAT } = require("../../../../utils/Constants/ErrorMessage");
const Loggers = require("../../../../utils/Loggers");
const LoginProcess = require("./scripts/LoginProcess");

module.exports = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    if (!username) throw ERROR_WRONG_FORMAT;
    const result = await LoginProcess(username, password);
    if (result.error) return result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}