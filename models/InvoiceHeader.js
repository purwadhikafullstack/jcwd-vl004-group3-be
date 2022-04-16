const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const User = require("./User");

const InvoiceHeader = sequelize.define(
  "InvoiceHeader",
  {
    code: { allowNull: false, type: Sequelize.STRING, unique: true },
    grand_total: { allowNull: false, type: Sequelize.INTEGER },
    status: Sequelize.STRING,
  },
  { tableName: "invoice_headers", paranoid: true }
);

// define associations here
const InvoiceHeaderUser = InvoiceHeader.belongsTo(User);
const UserInvoiceHeaders = User.hasMany(InvoiceHeader);

module.exports = InvoiceHeader;
