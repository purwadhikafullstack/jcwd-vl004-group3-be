const express = require("express");
const { productControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/:from/:limit", productControllers.get);
routers.post("/add", productControllers.add);
routers.delete("/delete/:id", productControllers.delete);
// routers.patch("/edit/:id", productControllers.edit);

module.exports = routers;
