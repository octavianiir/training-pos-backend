const Loggers = require("../../../../utils/Loggers");
const ProductPostData = require("./scripts/ProductPostData");

module.exports = async (req) => {
  try {
    const data = req.body;
    const result = await ProductPostData(null, data);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}