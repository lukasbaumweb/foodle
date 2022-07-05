const Ingredient = require("../models/Ingredient");
const { logAndRespond } = require("../utils/logging");

const getAllIngredients = (req, res, next) => {
  Ingredient.find().exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

const getOneIngredient = (req, res, next) => {
  const { id } = req.params;
  Ingredient.find({ _id: id }).exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

const createIngredient = (req, res, next) => {
  const { ingredient, amount, unit, foodleId } = req.body;

  if (!ingredient) {
    logAndRespond(res, "ingredient id is missing", 400);
    return;
  }

  if (!amount) {
    logAndRespond(res, "amount is missing", 400);
    return;
  }

  if (!unit) {
    logAndRespond(res, "unit is missing", 400);
    return;
  }

  Ingredient.create(
    { ingredient, amount, unit, foodle: foodleId },
    (err, data) => {
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        res.json({ data });
      }
    }
  );
};

const updateIngredient = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }

  Ingredient.updateOne({ _id: id }, { ...req.body }).exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

const deleteIngredient = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }

  Ingredient.deleteOne({ _id: id }).exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};
module.exports = {
  getAllIngredients,
  getOneIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
};
