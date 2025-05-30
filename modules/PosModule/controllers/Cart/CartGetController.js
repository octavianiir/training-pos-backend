const Loggers = require("../../../../utils/Loggers");
const CartGetData = require("./scripts/CartGetData");

module.exports = async (req) => {
  try {
    const query = req.query;
    const id = req.params.id;
    let filter = {...query};
    if (id) filter.id = id;
    const result = await CartGetData(null, filter);
    if (result.error) throw result.error;
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}