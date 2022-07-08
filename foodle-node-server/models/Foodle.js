const mongoose = require("mongoose");
const { Schema } = mongoose;

const FoodleSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    description: { type: String, default: "Keine Beschreibung vorhanden" },
    ingredients: [
      {
        ref: "Config",
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
    images: [
      {
        ref: "File",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    tags: [String],
    category: {
      type: String,
      enum: [
        "Backen",
        "Vorspeise",
        "Suppe",
        "Salat",
        "Hauptgericht",
        "Soße & Dressing",
        "Nachspeise",
        "Dip",
        "Getränke",
      ],
      default: "Hauptgericht",
    },
  },
  { timestamps: true }
);

FoodleSchema.index({ title: "text", description: "text", tags: "text" });

const Foodle = mongoose.model("Foodle", FoodleSchema);

Foodle.createIndexes();

module.exports = Foodle;
