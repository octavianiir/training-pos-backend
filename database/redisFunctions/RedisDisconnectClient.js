const Loggers = require("../../utils/Loggers");
const redisClient = require("../Redis");

module.exports = async () => {
  try {
    const client = await redisClient();
    await client.disconnect();
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
} 