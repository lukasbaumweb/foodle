const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
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
        validator: (v) => v.length > 2,
        message: (props) => `${props.value} is not at least 3 characters long`,
      },
      immutable: true,
    },
    email: {
      type: String,
      validate: {
        validator: (v) => validateEmail(v),
        message: (props) => `${props.value} is not a valid email (bad format)`,
      },
    },
    password: { type: String, select: false },
    hidden: Boolean,
    isActivated: Boolean,
    type: {
      type: String,
      enum: {
        values: ["guest", "user"],
        message: "{VALUE} is not supported",
      },
    },
    favs: [{ type: Schema.ObjectId, ref: "Foodle" }],
    ratings: [{ type: Schema.ObjectId, ref: "Foodle" }],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// UserSchema.pre("save", (next) => {
//   if ((this.password && this.isModified("password")) || this.isNew) {
//     if (this.password.length > 5) {
//       this.password = bcryptjs.hashSync(
//         this.password,
//         process.env.SALT_ROUNDS || 12
//       );
//     } else {
//       throw Error("password must be at least 6 characters");
//     }
//   }
//   console.log(this);

//   next();
// });

// UserSchema.pre("updateOne", (next) => {
//   if ((this.password && this.isModified("password")) || this.isNew) {
//     if (this.password.length > 5) {
//       this.password = bcryptjs.hashSync(
//         this.password,
//         process.env.SALT_ROUNDS || 12
//       );
//     } else {
//       throw Error("password must be at least 6 characters");
//     }
//   }
//   console.log(this);

//   next();
// });

UserSchema.methods.comparePassword = (oldPassword, password, callback) => {
  bcryptjs.compare(oldPassword, password, (error, isMatch) => {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
