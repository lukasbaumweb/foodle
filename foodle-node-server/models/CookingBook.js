const mongoose = require("mongoose");
const { Schema } = mongoose;

const CookingBookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
      required: false,
    },
    description: { type: String, default: "Keine Beschreibung vorhanden" },
    foodles: [
      {
        ref: "Foodle",
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    isPrivate: { type: Boolean, default: true },
    ratings: [{ type: Schema.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const CookingBook = mongoose.model("CookingBook", CookingBookSchema);

module.exports = CookingBook;
