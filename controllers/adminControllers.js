const sequelize = require("../lib/sequelize");
const Admin = require("../models/Admin");
const Crypto = require("crypto");
const { createToken } = require("../lib/createToken");

module.exports = {
  login: async (req, res) => {
    try {
      req.body.password = await Crypto.createHmac(
        process.env.HMAC_ALGORITHM,
        process.env.HMAC_KEY
      )
        .update(req.body.password)
        .digest("hex");

      const account = await Admin.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (account === null) {
        res.status(400).send("Invalid credentials.");
      } else {
        //@ts-ignore
        const { id, email, password } = account;
        const token = createToken({
          id,
          email,
          password,
        });
        res.status(200).send({
          id,
          email,
          token,
          message: "Login successful!",
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  register: async (req, res) => {
    // TODO: remove this in final version
    try {
      req.body.password = await Crypto.createHmac(
        process.env.HMAC_ALGORITHM,
        process.env.HMAC_KEY
      )
        .update(req.body.password)
        .digest("hex");

      const create = await Admin.findOrCreate({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });
      res.status(200).send(create);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
