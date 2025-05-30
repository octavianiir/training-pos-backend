const RedisGet = require("../../../database/redisFunctions/RedisGet");
const { error_unauthorized } = require("../../../utils/ApiHandler/ErrorHandler");
const Loggers = require("../../../utils/Loggers");
const { RC_USER_TOKEN, RC_USER_CACHE } = require("../../UserManagement/constants/UserConstants");
const { MIDDLEWARE_ERROR_NOTOKEN, MIDDLEWARE_ERROR_TOKENINVALID, MIDDLEWARE_ERROR_CACHEINVALID } = require("../constants/MiddlewareError");

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw MIDDLEWARE_ERROR_NOTOKEN;
    const chainAuth = auth.split(" ");
    const redisToken = await RedisGet(RC_USER_TOKEN + chainAuth[1]);
    if (!redisToken || redisToken == "") throw MIDDLEWARE_ERROR_TOKENINVALID;
    const redisCache = await RedisGet(RC_USER_CACHE + redisToken);
    if (!redisCache || redisCache == "") throw MIDDLEWARE_ERROR_CACHEINVALID;
    req.cache = {};
    req.cache.user = redisCache;
    next();
  } catch (error) {
    Loggers.error(__filename, error);
    error_unauthorized(res, error);
  }
}