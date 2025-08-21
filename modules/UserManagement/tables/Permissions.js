const { UUIDV4, DataTypes } = require("sequelize");

module.exports = {
  table: "permissions",
  fields: {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: UUIDV4 },
    role_id: { type: DataTypes.INTEGER },
    route_id: { type: DataTypes.INTEGER },
  }
}