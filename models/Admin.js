const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

const Admin = sequelize.define(
  "Admin",
  {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING(512),
      allowNull: false,
    },
  },
  { tableName: "admins" }
);

module.exports = Admin;
