const express = require("express");
const router = express.Router();

const generateAccessToken = (username) =>
  jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: "1800s" });

/**
 * Login route
 */
router.get("/login", (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * SignUp route
 */
router.post("/register", (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * Password reset route
 */
router.post("/reset", (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

module.exports = router;
