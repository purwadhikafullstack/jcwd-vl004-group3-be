const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const User = require("./User");
const Product = require("./Product");

const Cart = sequelize.define(
  "Cart",
  {
    qty: Sequelize.INTEGER,
  },
  { tableName: "carts" }
);

// define associations here
const CartUser = Cart.belongsTo(User);
const UserCarts = User.hasMany(Cart);
const CartProduct = Cart.belongsTo(Product);
const ProductCarts = Product.hasMany(Cart);

module.exports = Cart;
