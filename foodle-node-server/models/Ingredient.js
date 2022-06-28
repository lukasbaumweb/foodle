const mongoose = require("mongoose");
const units = require("../utils/units");
const { Schema } = mongoose;

const IngredientSchema = Schema(
  {
    name: String,
    amount: Number,
    unit: {
      type: String,
      enum: {
        values: units.food,
        message: "{VALUE} is not supported",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
