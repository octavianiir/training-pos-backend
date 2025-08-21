const { DataTypes } = require("sequelize");

module.exports = {
  table: "cart",
  fields: {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.UUID },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }
}