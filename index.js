const express = require("express");
const cors = require("cors");
const bearerToken = require("express-bearer-token");
const colors = require("colors");

const sequelize = require("./lib/sequelize");
const Address = require("./models/Address");
const Admin = require("./models/Admin");
const Cart = require("./models/Cart");
const Category = require("./models/Category");
const InvoiceDetail = require("./models/InvoiceDetail");
const InvoiceHeader = require("./models/InvoiceHeader");
const MovementLog = require("./models/MovementLog");
const PaymentConfirmation = require("./models/PaymentConfirmation");
const Product = require("./models/Product");
const Stock = require("./models/Stock");
const User = require("./models/User");
const Warehouse = require("./models/Warehouse");
const WarehouseDistance = require("./models/WarehouseDistance");

const PORT = process.env.PORT || 3300;
const app = express();
app.use(express.json());
app.use(cors());

const {
  productRouters,
  categoryRouters,
  warehouseRouters,
} = require("./routers");

app.get("/", (req, res) => {
  res.status(200).send("<h4>Group 3 Purwadhika bootcamp project backend</h4>");
});

app.use("/product", productRouters);
app.use("/category", categoryRouters);
app.use("/warehouse", warehouseRouters);

app.listen(PORT, () =>
  console.log(`Ready to serve connections on port ${PORT}`.green)
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("sequelize:".green + " connected to database.");
    // await sequelize.sync({ force: true });
    // console.log(
    //   "sequelize:".green + " tables synced successfully. " + "(force: true)".red
    // );
  } catch (error) {
    console.error(error);
  }
})();

// (async () => {
//   try {
//     Category.create({ category: "Makanan Ringan" });
//   } catch (error) {
//     console.error(error);
//   }
// })();
