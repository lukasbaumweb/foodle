const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodleSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    body: { type: String, default: "Keine Beschreibung vorhanden" },
    ingredients: [{ type: Object }],
    tutorial: { type: String, default: "Keine Anleitung vorhanden" },
    comments: [
      {
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    isPrivate: { type: Boolean, default: true },
    ratings: [{ type: Schema.ObjectId, ref: "User" }],
    difficulty: {
      type: Number,
      validate: {
        validator: (v) => v > 0 && v < 11,
        message: (props) => `${props.value} is not between 0 and 11`,
      },
    },
    steps: [{ type: Object }],
    favs: [{ type: Schema.ObjectId, ref: "User" }],
    rating: {
      type: Number,
      default: 0,
    },
    cookingTime: { type: Number },
    workTime: { type: Number },
    calories: { type: Number },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Foodle = mongoose.model("Foodle", FoodleSchema);

module.exports = Foodle;
