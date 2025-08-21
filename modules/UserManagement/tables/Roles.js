const { DataTypes } = require("sequelize");

module.exports = {
  table: "roles",
  fields: {
    rolename: { type: DataTypes.STRING },
  }
}