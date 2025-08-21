const { GenerateHash } = require("../../../../../utils/Hash")

module.exports = (password, salt) => {
  return GenerateHash(password, salt);
}