const { DataTypes } = require("sequelize");

module.exports = {
  table: "routes",
  fields: {
    path: { type: DataTypes.STRING },
    method: { type: DataTypes.STRING },
  }
}