const Ingredient = require("../models/Ingredient");
const { BadRequestError } = require("../utils/errors");

const getAllIngredients = (req, res, next) => {
  Ingredient.find().exec((err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ data });
    }
  });
};

const getOneIngredient = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  Ingredient.find({ _id: id }).exec((err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ data });
    }
  });
};

const createIngredient = (req, res, next) => {
  const { ingredient, amount, unit, foodleId } = req.body;

  if (!id) {
    next(new BadRequestError("ingriedient id missing"));
    return;
  }

  if (!unit) {
    next(new BadRequestError("unit missing"));
    return;
  }

  Ingredient.create(
    { ingredient, amount, unit, foodle: foodleId },
    (err, data) => {
      if (err) {
        next(err);
      } else res.json({ data });
    }
  );
};

const updateIngredient = (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  Ingredient.updateOne({ _id: id }, { ...req.body }).exec((err, data) => {
    if (err) {
      next(err);
    } else {
      res.json({ data });
    }
  });
};

const deleteIngredient = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  Ingredient.deleteOne({ _id: id }).exec((err, data) => {
    if (err) {
      next(err);
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
