const RedisDelete = require("../../database/redisFunctions/RedisDelete");
const Loggers = require("../Loggers");
const { raceLockKey } = require("./LockKey");

module.exports = async (table, id) => {
  try {
    let key = raceLockKey(table, id);
    const unlock = await RedisDelete(key);
    if (unlock.error) throw unlock.error;
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}