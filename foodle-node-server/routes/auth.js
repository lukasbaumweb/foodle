const express = require("express");
const router = express.Router();

const {
  login,
  register,
  resetPassword,
  changePassword,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * Login routes
 */
router.post("/login", login);
router.get("/", login);

/**
 * SignUp route
 */
router.post("/register", register);

/**
 * Password reset route
 */
router.post("/reset", resetPassword);

/**
 * Password change route
 */
router.post("/changePassword", authMiddleware, changePassword);

module.exports = router;
