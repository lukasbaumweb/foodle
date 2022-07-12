const express = require("express");
const { getChangeLog } = require("../controllers/changelogController");
const router = express.Router();

/**
 * Get all entries
 */
router.get("/", getChangeLog);

module.exports = router;
