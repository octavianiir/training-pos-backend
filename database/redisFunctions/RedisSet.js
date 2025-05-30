const Loggers = require("../../utils/Loggers");
const redisClient = require("../Redis");

module.exports = async (key, value, expire = null) => {
  try {
    const client = await redisClient();
    const valueString = JSON.stringify(value);
    if (expire) await client.setEx(key, expire, valueString);
    else await client.set(key, valueString);
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}