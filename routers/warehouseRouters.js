const express = require("express");
const { warehouseControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get/", warehouseControllers.get);
routers.post("/add", warehouseControllers.add);
routers.delete("/delete/:id", warehouseControllers.delete);
routers.patch("/edit/:id", warehouseControllers.edit);

module.exports = routers;
