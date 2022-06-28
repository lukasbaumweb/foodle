const Ingredient = require("../models/Ingredient");

const getAllIngredients = (req, res, next) => {
  Ingredient.find().exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

module.exports = { getAllIngredients };
