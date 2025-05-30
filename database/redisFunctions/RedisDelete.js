const Loggers = require("../../utils/Loggers");
const redisClient = require("../Redis");

module.exports = async (key) => {
  try {
    const client = await redisClient();
    await client.del(key);
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}