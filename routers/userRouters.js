const express = require("express");
const { userControllers } = require("../controllers");
const { auth } = require("../lib/authToken");
const routers = express.Router();

routers.post("/login", userControllers.login);
routers.post("/register", userControllers.register);
routers.patch("/verify", auth, userControllers.verification);

module.exports = routers;
