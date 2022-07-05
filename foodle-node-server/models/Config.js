const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConfigSchema = Schema({
  name: String,
  type: {
    type: String,
    enum: {
      values: ["ingredient", "tag"],
      message: "{VALUE} is not supported",
    },
  },
});

const Config = mongoose.model("Config", ConfigSchema);

module.exports = Config;
