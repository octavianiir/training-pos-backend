const { error_unauthorized } = require("../../../utils/ApiHandler/ErrorHandler");
const Loggers = require("../../../utils/Loggers");
const { MIDDLEWARE_ERROR_NOPERMISSION } = require("../constants/MiddlewareError");
const { match } = require('path-to-regexp');
require("dotenv").config();

module.exports = (req, res, next) => {
  try {
    const listPermission = req.cache.user.permission;
    const checkPass = listPermission.some(permission => {
      const isMethodMatch = Object.entries(req.route.methods)
        .some(([methodName, isActive]) => isActive && methodName === permission.method);

      if (!isMethodMatch) return false;
      const matcher = match(permission.path, { decode: decodeURIComponent });
      const matched = matcher(req.path);

      return Boolean(matched);
    });

    if (!checkPass) throw MIDDLEWARE_ERROR_NOPERMISSION;
    next();
  } catch (error) {
    Loggers.error(__filename, error);
    error_unauthorized(res, error);
  }
}