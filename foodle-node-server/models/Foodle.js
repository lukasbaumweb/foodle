const mongoose = require("mongoose");
const { Schema } = mongoose;

const foodleSchema = new Schema({
  title: String,
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  private: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
