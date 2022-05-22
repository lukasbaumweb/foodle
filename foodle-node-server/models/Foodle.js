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
    ingredients: [{ type: String }],
    tutorial: { type: String, default: "Keine Anleitung vorhanden" },
    comments: [
      {
        ref: "Comment",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    private: { type: Boolean, default: true },
    ratings: [{ type: Schema.ObjectId, ref: "User" }],
    favs: [{ type: Schema.ObjectId, ref: "User" }],
    rating: {
      type: Number,
      default: 0,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Foodle = mongoose.model("Foodle", FoodleSchema);

module.exports = Foodle;
