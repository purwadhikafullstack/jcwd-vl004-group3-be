const jwt = require("jsonwebtoken");

module.exports = {
  auth: (req, res, next) => {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        console.error("auth-verify: " + err);
        return res.status(401).send("User not authenticated.");
      }
      req.user = decode;
      next();
    });
  },
};
