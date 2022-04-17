const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here

const User = sequelize.define(
  "User",
  {
    full_name: Sequelize.STRING,
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING(512),
    },
    is_verified: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BOOLEAN,
    },
    is_active: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BOOLEAN,
    },
    is_pend_reset: {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BOOLEAN,
    },
  },
  { tableName: "users", paranoid: true }
);

// define associations here

module.exports = User;
