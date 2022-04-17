const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const InvoiceDetail = require("./InvoiceDetail");
const Warehouse = require("./Warehouse");
const Admin = require("./Admin");

const MovementLog = sequelize.define(
  "MovementLog",
  {
    date: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  },
  { tableName: "movement_logs" }
);

// define associations here
const MovementLogInvoiceDetail = MovementLog.belongsTo(InvoiceDetail);
const MovementLogFrom = MovementLog.belongsTo(Warehouse, {
  as: "from",
  foreignKey: "from_id",
});
const MovementLogTo = MovementLog.belongsTo(Warehouse, {
  as: "to",
  foreignKey: "to_id",
});
const MovementLogAdmin = MovementLog.belongsTo(Admin);

module.exports = MovementLog;
