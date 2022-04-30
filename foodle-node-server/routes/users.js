const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * Get all users
 */
router.get("/", authMiddleware, (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * get one user
 */
router.get("/:id", authMiddleware, (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * create one user
 */
router.post("/", authMiddleware, (req, res, next) => {
  

  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * update one user
 */
router.put("/:id", authMiddleware, (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * delete one user
 */
router.delete("/:id", authMiddleware, (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

module.exports = router;
