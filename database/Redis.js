const { createClient } = require("redis");
const Loggers = require("../utils/Loggers");

let client;

async function redisClient() {
  try {
    const REDIS_HOST = process.env.REDIS_DB_HOST || "127.0.0.1";
    const REDIS_PORT = process.env.REDIS_DB_PORT || "6379";
    if (client) return client;
    console.log("initial redis client");
    client = createClient({ url: `redis://${REDIS_HOST}:${REDIS_PORT}` });
    await client.connect();
    return client;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

module.exports = redisClient;