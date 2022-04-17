const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here

const Product = sequelize.define(
  "Product",
  {
    name: { allowNull: false, type: Sequelize.STRING },
    buy_price: { allowNull: false, type: Sequelize.INTEGER },
    sell_price: { allowNull: false, type: Sequelize.INTEGER },
    description: Sequelize.TEXT,
    img_path: Sequelize.TEXT,
  },
  { tableName: "products", paranoid: true }
);

// define associations here

module.exports = Product;
