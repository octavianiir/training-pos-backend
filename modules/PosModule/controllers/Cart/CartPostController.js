const Loggers = require("../../../../utils/Loggers");
const CartPostData = require("./scripts/CartPostData");

module.exports = async (req) => {
  try {
    const data = req.body;
    const result = await CartPostData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}