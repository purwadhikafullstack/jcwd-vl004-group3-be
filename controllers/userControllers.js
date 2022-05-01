const sequelize = require("../lib/sequelize");
const User = require("../models/User");
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

      const account = await User.findOne({
        where: {
          email: req.body.email,
          password: req.body.password,
        },
      });

      if (account === null) {
        res.status(400).send("Invalid credentials.");
        //@ts-ignore
      } else if (!account.is_verified) {
        res.status(400).send("Account has not been verified.");
        //@ts-ignore
      } else if (!account.is_active) {
        res
          .status(400)
          .send("Account has been deactivated, please contact the admin.");
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
      console.error(error);
      res.status(500).send(error);
    }
  },
};
