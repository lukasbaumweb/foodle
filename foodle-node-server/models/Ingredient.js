const mongoose = require("mongoose");
const units = require("../utils/units");
const { Schema } = mongoose;

const IngredientSchema = Schema(
  {
    config: {
      ref: "Config",
      type: mongoose.Schema.Types.ObjectId,
    },
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

IngredientSchema.plugin(require("mongoose-autopopulate"));

const Ingredient = mongoose.model("Ingredient", IngredientSchema);

module.exports = Ingredient;
