const express = require("express");
const { getConfig } = require("../controllers/configController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * Get all entries
 */
router.get("/:entity", getConfig);

/**
 * get one entry
 */
router.get("/:id", authMiddleware, (req, res, next) => {
  res.json({ error: "Not implemented" });
});

/**
 * create one entry
 */
router.post("/", authMiddleware, (req, res, next) => {
  res.json({ error: "Not implemented" });
});

/**
 * update one entry
 */
router.put("/:id", authMiddleware, (req, res, next) => {
  res.json({ error: "Not implemented" });
});

/**
 * delete one entry
 */
router.delete("/:id", authMiddleware, (req, res, next) => {
  res.json({ error: "Not implemented" });
});

module.exports = router;
