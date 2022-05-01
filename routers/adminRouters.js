const express = require("express");
const { adminControllers } = require("../controllers");
const routers = express.Router();

routers.post("/login", adminControllers.login);
routers.post("/register", adminControllers.register);

module.exports = routers;
