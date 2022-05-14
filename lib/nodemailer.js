const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "no.reply.bango@gmail.com",
    pass: "csamyynpyfmgwnks",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

module.exports = transporter;
