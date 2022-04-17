const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const Product = require("./Product");
const Warehouse = require("./Warehouse");

const Stock = sequelize.define(
  "Stock",
  {
    ready_stock: { allowNull: false, type: Sequelize.INTEGER },
    reserve_stock: { allowNull: false, type: Sequelize.INTEGER },
  },
  { tableName: "stocks" }
);

// define associations here
const StockProduct = Stock.belongsTo(Product);
const ProductStocks = Product.hasMany(Stock);
const StockWarehouse = Stock.belongsTo(Warehouse);
const WarehouseStock = Warehouse.hasOne(Stock);

module.exports = Stock;
