const express = require("express");
const router = express.Router();

const {
  login,
  register,
  resetPassword,
  changePassword,
  getCurrentUser,
  checkAuthStatus,
  updateUser,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", login);
router.post("/register", register);
router.post("/reset", resetPassword);
router.put("/changePassword", authMiddleware, changePassword);
router.get("/check", authMiddleware, checkAuthStatus);

router.get("/user", authMiddleware, getCurrentUser);
router.put("/user", authMiddleware, updateUser);

module.exports = router;
