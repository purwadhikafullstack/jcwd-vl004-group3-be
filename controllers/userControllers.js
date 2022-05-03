const sequelize = require("../lib/sequelize");
const User = require("../models/User");
const Crypto = require("crypto");
const { createToken } = require("../lib/createToken");
const transporter = require("../lib/nodemailer");

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
          .send("Account has been deactivated, please contact admin.");
      } else {
        //@ts-ignore
        const { id, full_name, email, password } = account;
        const token = createToken({
          id,
          full_name,
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
  register: async (req, res) => {
    let { full_name, email, password } = req.body;
    try {
      password = Crypto.createHmac(
        process.env.HMAC_ALGORITHM,
        process.env.HMAC_KEY
      )
        .update(password)
        .digest("hex");

      let user = await User.create({
        full_name,
        email,
        password,
        is_active: true,
      });

      //@ts-ignore
      let token = createToken({ id: +user.id, full_name, email, password });

      let mail = {
        from: `Admin <no.reply.bango@gmail.com>`,
        to: `${email}`,
        subject: "Account Verification",
        html: `<a href='http://localhost:3000/authentication/${token}'>Click here to verify your account</a>`,
      };

      transporter.sendMail(mail, (errMail, resMail) => {
        if (errMail) {
          console.log(errMail);
          res.status(500).send({
            message: "Registration Failed!",
            success: false,
            err: errMail,
          });
        } else {
          res.status(200).send({
            message: "Registration Success, Check Your Email!",
            success: true,
          });
        }
      });
    } catch (err) {
      console.error(err);
      res.status(500).send(err);
    }
  },
  verification: async (req, res) => {
    try {
      const update = await User.update(
        { is_verified: true },
        {
          where: {
            id: +req.user.id,
          },
        }
      );
      res.status(200).send({ message: "Account verified", success: true });
    } catch (err) {
      console.error(err);
      res.status(400).send(err);
    }
  },
};
