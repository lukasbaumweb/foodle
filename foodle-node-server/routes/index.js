var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (_, res) {
  res.json({ message: "You have reached the foodle-api" });
});

module.exports = router;
