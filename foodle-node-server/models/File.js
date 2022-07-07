const mongoose = require("mongoose");
const { Schema } = mongoose;

const FileSchema = Schema(
  {
    title: String,
    name: String,
    type: String,
    path: String,
    storedAt: String,
    storedName: String,
    size: String,
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", FileSchema);

module.exports = File;
