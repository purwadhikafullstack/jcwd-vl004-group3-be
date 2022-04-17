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
      const products = await Product.findAll({
        offset: +req.params.from,
        limit: +req.params.limit,
        include: { all: true },
      });
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  add: async (req, res) => {
    /* request example: 
    {
    "name": "Chitato",
    "buy_price": 15000,
    "sell_price": 16000,
    "description": "Camilan keripik kentang.",
    "img_path": "path",
    "category": "Makanan Ringan",
    "warehouses": [
        {"name": "Malang", "ready_stock": 15, "reserve_stock": 15},
        {"name": "Surabaya", "ready_stock": 9, "reserve_stock": 9},
        {"name": "Jakarta Selatan", "ready_stock": 9, "reserve_stock": 9},
        {"name": "Bali", "ready_stock": 0, "reserve_stock": 0}
    ]
    }*/

    try {
      const {
        name,
        buy_price,
        sell_price,
        description,
        img_path,
        category,
        // contains an array: {warehouse name, ready_stock, reserve_stock}
        warehouses,
      } = req.body;

      // finds and adds category by name, instead of ID
      const CategoryInstance = await Category.findOne({
        where: {
          category,
        },
      });

      const add = await Product.create({
        name,
        buy_price: +buy_price,
        sell_price: +sell_price,
        description,
        img_path,
        // @ts-ignore
        CategoryId: `${CategoryInstance.dataValues.id}`,
      });

      await warehouses.forEach(async (warehouse) => {
        const { name, ready_stock, reserve_stock } = await warehouse;
        const WarehouseInstance = await Warehouse.findOne({
          where: {
            name,
          },
        });

        await Stock.create({
          ready_stock: +ready_stock,
          reserve_stock: +reserve_stock,
          // @ts-ignore
          ProductId: add.id,
          // @ts-ignore
          WarehouseId: `${WarehouseInstance.dataValues.id}`,
        });
      });

      // returns the primary key of the just-inserted product
      //@ts-ignore vs code can't see the dynamically-generated id prop
      res.status(200).send(`${add.id}`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
  delete: async (req, res) => {
    try {
      const remove = await Product.destroy({
        where: {
          id: +req.params.id,
        },
      });
      res.status(200).send(`Product ID ${req.params.id} deleted.`);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  },
};
