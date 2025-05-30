const { randomBytes, pbkdf2Sync } = require("crypto")

const salt_length = 16
const hash_iteration = 4120
const hash_length = 32
const hash_type = 'sha512'
const string_type = 'hex'
const uuidv4Pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;


module.exports = {
  GenerateHash: (a, b) => {
    if (!b) return randomBytes(salt_length).toString(string_type);
    return pbkdf2Sync(a.toString(), b.toString(), hash_iteration, hash_length, hash_type).toString(string_type);
  },
  isValidUUIDv4:(str)=>{
    return uuidv4Pattern.test(str);
  }

}