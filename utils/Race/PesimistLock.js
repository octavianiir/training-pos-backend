const Loggers = require("../Loggers");
const { raceLockKey } = require("./LockKey");

module.exports = async (table, id) => {
  try {
    let key = raceLockKey(table, id);
    const lock = await RedisSet(key, "lock");
    if (lock.error) throw lock.error;
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}