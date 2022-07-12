const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const { NotAuthenticatedError } = require("../utils/errors");
const { Schema } = mongoose;
const { validateEmail } = require("./../utils/functions");

const UserSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    username: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => v.length > 3,
        message: (props) => `${props.value} is too short`,
      },
      required: true,
      immutable: true,
    },
    email: {
      type: String,
      validate: {
        validator: (v) => validateEmail(v),
        message: (props) => `${props.value} is not a valid email (bad format)`,
      },
      select: false,
      unique: true,
      required: true,
    },
    password: { type: String, select: false },
    isActivated: { type: Boolean, select: false },
    favs: [{ type: Schema.ObjectId, ref: "Foodle", select: false }],
    ratings: [{ type: Schema.ObjectId, ref: "Foodle", select: false }],
    createdAt: { type: Date, default: Date.now, select: false },
  },
  { timestamps: true }
);

UserSchema.methods.comparePassword = (oldPassword, password, callback) => {
  bcryptjs.compare(oldPassword, password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      if (!isMatch) {
        callback(new NotAuthenticatedError("password wrong"));
      } else callback(null, isMatch);
    }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
