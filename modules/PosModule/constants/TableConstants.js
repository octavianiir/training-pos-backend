const Product = require("../tables/Product");
const Cart = require("../tables/Cart");

const TB_PRODUCT = Product.table;
const TB_CART = Cart.table;

module.exports = {
  TB_PRODUCT,
  TB_CART,
}