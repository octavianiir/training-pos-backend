const Loggers = require("../../utils/Loggers");
const redisClient = require("../Redis")

module.exports = async (key) => {
  try {
    let data;
    const client = await redisClient();
    const result = await client.get(key);
    if (result) data = JSON.parse(result);
    return data;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}