const RedisGet = require("../../database/redisFunctions/RedisGet");
const Loggers = require("../Loggers");
const { raceLockKey } = require("./LockKey");

module.exports = async (table, id) => {
  try {
    let key = raceLockKey(table, id);
    const wait = await recursiveWait(key);
    if (wait.error) throw wait.error;
    return true;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

async function recursiveWait(key) {
  try {
    const isLocked = await RedisGet(key);
    if (isLocked) {
      await randomDelay();
      return recursiveWait();
    }
    return;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error}; 
  }
}

const randomDelay = () => new Promise(resolve => {
  setTimeout(resolve, Math.random() * 100);
})