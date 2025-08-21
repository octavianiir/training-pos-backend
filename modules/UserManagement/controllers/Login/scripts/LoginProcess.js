const RedisSet = require("../../../../../database/redisFunctions/RedisSet");
const { ERROR_FAILED_TO_LOGIN } = require("../../../../../utils/Constants/ErrorMessage");
const { GenerateHash } = require("../../../../../utils/Hash");
const Loggers = require("../../../../../utils/Loggers");
const { RC_USER_CACHE, RC_USER_TOKEN } = require("../../../constants/UserConstants");
const UserGetFullData = require("../../Users/scripts/UserGetFullData");
const GeneratePasswordHash = require("./GeneratePasswordHash");

module.exports = async (username, password) => {
  try {
    const userFullData = await UserGetFullData(null, { username });
    console.log('userFullData')
    console.log(userFullData)
    console.log(userFullData.error)
    console.log(userFullData.is_active)
    if (userFullData.error) throw userFullData.error;
    if (!userFullData.is_active) throw ERROR_FAILED_TO_LOGIN;
    if (!isPasswordTrue(userFullData, password)) throw ERROR_FAILED_TO_LOGIN;
    const token = await generateToken(userFullData);
    return serveData(userFullData, token); 
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}

function isPasswordTrue(userData, inputPassword) {
  const hashedPassword = userData.password;
  const hashedInput = GeneratePasswordHash(inputPassword, userData.salt);
  return hashedPassword == hashedInput;
}

function formatUserData(userData) {
  let result = userData;
  delete result.password;
  delete result.salt;
  delete result.createdAt;
  delete result.updatedAt;
  delete result.is_active;
  delete result.role_id;
  return result;
}

function serveData(userData, token) {
  let result = formatUserData(userData);
  return {user:result, token};
}

async function generateToken(userData) {
  const token = GenerateHash();
  await RedisSet(RC_USER_CACHE + userData.id, formatUserData(userData));
  await RedisSet(RC_USER_TOKEN + token, userData.id);
  return token;
}