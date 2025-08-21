const { UUIDV4, DataTypes } = require("sequelize");

module.exports = {
  table: "users",
  fields: {
    id: { type: DataTypes.UUID, allowNull: false, primaryKey: true, defaultValue: UUIDV4 },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    salt: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    role_id: { type: DataTypes.INTEGER },
    is_active: { type: DataTypes.BOOLEAN },
  }
}