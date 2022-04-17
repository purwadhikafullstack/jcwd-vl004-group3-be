require("dotenv").config();

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
  timezone: "+07:00",
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
});

module.exports = sequelize;
