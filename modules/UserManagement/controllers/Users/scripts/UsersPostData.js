const { models } = require("../../../../../database/Sequelize");
const Loggers = require("../../../../../utils/Loggers");
const AvoidDuplicate = require("../../../../PosModule/constants/AvoidDuplicate");
const { TB_USERS } = require("../../../constants/TableConstants");
const { GenerateHash } = require("../../../../../utils/Hash");
// const GeneratePasswordHash = require("../controllers/Login/scripts/GeneratePasswordHash");
const GeneratePasswordHash = require("../../../controllers/Login/scripts/GeneratePasswordHash");

module.exports = async (db = null, data = []) => {
  let dbmodel = models;
  if (db) dbmodel = db.models;

  const fieldPointer = ["username", "password", "name", "role_id", "salt", "is_active"];
  const table = TB_USERS;

  try {
    
    for (const i in data) {
      if (data[i].password) {
        const createSalt = GenerateHash(); 
        const createPassword = GeneratePasswordHash(data[i].password, createSalt);

        data[i].salt = createSalt;
        data[i].password = createPassword;
        data[i].is_active = true;
      }
    }
    // const adminData = {
    //   username: ADMIN_USERNAME,
    //   password: createPassword,
    //   salt: createSalt,
    //   role_id: adminID,
    //   name: ADMIN_USERNAME,
    //   is_active: true
    // }
    
    console.log("---data")
    console.log(data)


    let result = await AvoidDuplicate(dbmodel, table, fieldPointer, data);
    return result;
  } catch (error) {
    Loggers.error(__filename, error);
    return {error};
  }
}