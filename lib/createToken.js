const jwt = require("jsonwebtoken");

module.exports = {
  createToken: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
  },
};
