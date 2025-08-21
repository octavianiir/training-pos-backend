const { DataTypes } = require("sequelize");

module.exports = {
  table: "product",
  fields: {
    product_name: { type: DataTypes.STRING, allowNull: false },
    product_price: { type: DataTypes.DOUBLE, allowNull: false },
    product_description: { type: DataTypes.STRING, allowNull: true },
    product_image: { type: DataTypes.STRING, allowNull: true },
  }
}