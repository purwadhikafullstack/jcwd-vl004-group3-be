const express = require("express");
const { categoryControllers } = require("../controllers");
const routers = express.Router();

routers.get("/get", categoryControllers.get);
routers.post("/add", categoryControllers.add);
routers.delete("/delete/:id", categoryControllers.delete);
routers.patch("/edit/:id", categoryControllers.edit);

module.exports = routers;
