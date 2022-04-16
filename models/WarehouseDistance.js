const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

const WarehouseDistance = sequelize.define(
  "WarehouseDistance",
  {
    from_postcode: { allowNull: false, type: Sequelize.INTEGER },
    to_postcode: { allowNull: false, type: Sequelize.INTEGER },
    duration: { allowNull: false, type: Sequelize.INTEGER },
  },
  { tableName: "warehouse_distances", paranoid: true }
);

module.exports = WarehouseDistance;
