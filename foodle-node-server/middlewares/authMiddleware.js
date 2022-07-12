const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../config");
const {
  NotAuthenticatedError,
  SessionExpiredError,
} = require("../utils/errors");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return next(new NotAuthenticatedError("user not authenticated"));

  jwt.verify(token, JWT_TOKEN, (err, user) => {
    if (err) {
      next(new SessionExpiredError("session expired"));
    } else {
      req.user = user;
      next();
    }
  });
};

module.exports = authMiddleware;
