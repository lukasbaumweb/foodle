var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (_req, res) => {
  res.json({
    message: "You have reached the foodle-api",
    clientVersion: process.env.FODDLE_CLIENT_VERSION,
  });
});

module.exports = router;
