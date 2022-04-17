const sequelize = require("../lib/sequelize");
const Address = require("../models/Address");
const Admin = require("../models/Admin");
const Cart = require("../models/Cart");
const Category = require("../models/Category");
const InvoiceDetail = require("../models/InvoiceDetail");
const InvoiceHeader = require("../models/InvoiceHeader");
const MovementLog = require("../models/MovementLog");
const PaymentConfirmation = require("../models/PaymentConfirmation");
const Product = require("../models/Product");
const Stock = require("../models/Stock");
const User = require("../models/User");
const Warehouse = require("../models/Warehouse");
const WarehouseDistance = require("../models/WarehouseDistance");

module.exports = {
  get: async (req, res) => {
    try {
      const all = await Warehouse.findAll();
      res.status(200).send(all);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  add: async (req, res) => {
    try {
      const { name, address, postcode } = req.body;
      const add = await Warehouse.findOrCreate({
        where: {
          name,
        },
        defaults: {
          name,
          address,
          postcode: +postcode,
        },
      });
      // @ts-ignore vs code can't see the dynamically-generated id prop
      res.status(200).send(JSON.stringify(add[0].id));
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const remove = await Warehouse.destroy({
        where: {
          id: +req.params.id,
        },
      });
      res.status(200).send(`Warehouse ID ${req.params.id} deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  edit: async (req, res) => {
    try {
      const update = await Warehouse.update(
        {
          ...req.body,
        },
        {
          where: { id: +req.params.id },
        }
      );
      res.status(200).send(`Warehouse ID ${req.params.id} updated.`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
