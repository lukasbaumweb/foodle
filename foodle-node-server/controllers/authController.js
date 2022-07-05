const User = require("../models/User");
const { logAndRespond } = require("./../utils/logging");
const bcryptjs = require("bcryptjs");
const { translater } = require("./../utils/errorCodes");
const jwt = require("jsonwebtoken");

const generateAccessToken = (username, id) => {
  const payload = { username, id };

  return jwt.sign(payload, process.env.JWT_TOKEN || "web is awesome", {
    expiresIn: process.env.FOODLE_JWT_EXPIRY || "30d",
  });
};

const login = (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);
  if (!username || !password) {
    res.json({ error: "username or password are missing" });
    return;
  }

  User.findOne({ username }, "username password type ", (err, user) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
      return;
    }
    if (!user) {
      res.status(400).json({
        error: {
          message: translater("auth-error/user-unknown"),
          code: "auth-error/user-unknown",
        },
      });
      return;
    }

    user.comparePassword(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        res.json({ error: err });
        return;
      }

      if (isMatch) {
        res.json({
          message: "login successful",
          data: {
            uid: user._id,
            username: user.username,
            type: user.type,
            token: generateAccessToken(username, user._id),
          },
        });
      } else {
        res.status(400).json({
          error: {
            message: translater("auth-error/incorrect-password"),
            code: "auth-error/incorrect-password",
          },
        });
      }
    });
  });
};

const register = (req, res) => {
  const { username, password, mode } = req.body;

  switch (mode) {
    case "guest":
      if (username) {
        User.create({ username, type: "guest" }, (err, user) => {
          if (err) {
            console.error(err);
            logAndRespond(res, { error: "Error occured" }, 500);
            return;
          }
          logAndRespond(res, {
            token: generateAccessToken(username, user._id),
          });
        });
      } else {
        logAndRespond(res, "username is missing", 400);
      }
      break;
    case "user":
      if (username) {
        const { firstName, lastName, email } = req.body;
        const salt = bcryptjs.genSaltSync(
          parseInt(process.env.SALT_ROUNDS) || 12
        );

        const hashedPassword = bcryptjs.hashSync(password, salt);
        User.create(
          {
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
            type: "user",
          },
          (error, user) => {
            if (error) {
              console.error(error);
              logAndRespond(res, { error }, 500);
              return;
            }
            logAndRespond(res, {
              data: {
                uid: user._id,
                username: user.username,
                type: user.type,
                token: generateAccessToken(username, user._id),
              },
            });
          }
        );
      } else {
        logAndRespond(res, "username is missing", 400);
      }
      break;

    default:
      res.json({ error: "Not implemented" });

      break;
  }
};

const resetPassword = (req, res) => {
  res.json({ error: "Not implemented" });
};

const changePassword = (req, res) => {
  const { username, oldPassword, newPassword } = req.body;

  if (!username || !oldPassword || !newPassword) {
    res.json({ error: "username, old password or new password are missing" });
    return;
  }

  User.findOne({ username }, "password", (err, user) => {
    if (err) console.error(err);

    if (user === null) {
      res.json({ error: "user not found" });
      return;
    }

    user.comparePassword(oldPassword, user.password, async (err, isMatch) => {
      if (err) console.error(err);
      if (isMatch) {
        const result = await User.updateOne(
          { _id: user._id },
          { password: newPassword }
        ).exec();

        console.log(result);
        res.json({
          success: "password changed successfully",
        });
      } else {
        res.json({ error: "password incorrect" });
      }
    });
  });

  // res.json({ error: "Not implemented" });
};

module.exports = { login, register, resetPassword, changePassword };
