const sequelize = require("../lib/sequelize");
const Sequelize = require("sequelize");

// import models to associate here
const User = require("./User");

const Address = sequelize.define(
  "Address",
  {
    address: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    postcode: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  },
  { tableName: "addresses", paranoid: true }
);

// define associations here
const AddressUser = Address.belongsTo(User);
const UserAddresses = User.hasMany(Address);

module.exports = Address;
