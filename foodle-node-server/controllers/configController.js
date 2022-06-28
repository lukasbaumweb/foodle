const Config = require("../models/Config");

const getIngredientConfig = (req, res, next) => {
  Config.find({ type: "ingredient" }).exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

module.exports = { getIngredientConfig };
