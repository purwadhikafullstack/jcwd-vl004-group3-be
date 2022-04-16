const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const Product = require("./Product");

const Warehouse = sequelize.define(
  "Warehouse",
  {
    name: { allowNull: false, type: Sequelize.STRING },
    address: { allowNull: false, type: Sequelize.TEXT },
    postcode: { allowNull: false, type: Sequelize.INTEGER },
  },
  { tableName: "warehouses", paranoid: true }
);

// define associations here
// const WarehouseProduct = Warehouse.belongsTo(Product);
// const ProductWarehouses = Product.hasMany(Warehouse);
Product.belongsToMany(Warehouse, {
  through: "warehouse_products",
  as: "products",
  foreignKey: "ProductId",
});

Warehouse.belongsToMany(Product, {
  through: "warehouse_products",
  as: "warehouses",
  foreignKey: "WarehouseId",
});

module.exports = Warehouse;
