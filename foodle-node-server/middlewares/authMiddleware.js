const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");
const { translater } = require("../utils/errorCodes");
const { logAndRespond } = require("../utils/logging");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return logAndRespond(res, "auth-error/login-required", 401);

  jwt.verify(token, JWT_TOKEN, (err, user) => {
    if (err) {
      console.error(err);
      logAndRespond(res, "auth-error/session-expired", 403);
      return;
    }
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
