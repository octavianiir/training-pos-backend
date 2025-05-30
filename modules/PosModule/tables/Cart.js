const { DataTypes } = require("sequelize");

module.exports = {
  table: "cart",
  fields: {
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
  }
}