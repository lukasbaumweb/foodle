const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");

const checkUserMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, JWT_TOKEN, (err, user) => {
    if (!err) {
      req.user = user;
    }
    next();
  });
};

module.exports = checkUserMiddleware;
