const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  hashedPassword: String,
  hidden: Boolean,
  createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model("User", userSchema);

module.exports = User;
