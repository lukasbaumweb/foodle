const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");
const { logAndRespond } = require("./../utils/logging");
const authMiddleware = require("../middlewares/authMiddleware");
const bcryptjs = require("bcryptjs");
const { translater } = require("./../utils/errorCodes");

const generateAccessToken = (username, id) => {
  const payload = { username, id };

  return jwt.sign(payload, process.env.JWT_TOKEN || "web is awesome", {
    expiresIn: process.env.FOODLE_JWT_EXPIRY || "30d",
  });
};

/**
 * Login route
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;
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

  // res.json({ error: "Not implemented" });
});

/**
 * Login route
 */
router.get("/", (req, res) => {
  res.json({ error: "Not implemented" });
});

/**
 * SignUp route
 */
router.post("/register", (req, res) => {
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
        const salt = bcryptjs.genSaltSync(
          parseInt(process.env.SALT_ROUNDS) || 12
        );

        const hashedPassword = bcryptjs.hashSync(password, salt);
        User.create(
          { username, password: hashedPassword, type: "user" },
          (error, user) => {
            if (error) {
              console.error(error);
              logAndRespond(res, { error }, 500);
              return;
            }
            logAndRespond(res, {
              token: generateAccessToken(username, user._id),
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
});

/**
 * Password reset route
 */
router.post("/reset", (req, res) => {
  res.json({ error: "Not implemented" });
});

/**
 * Password change route
 */
router.post("/changePassword", (req, res) => {
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
});

/**
 * Check jwt token
 */
router.post("/check", authMiddleware, (req, res) => {
  const { id, iat, exp } = req.user;

  User.findById(id, (err, user) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
    } else {
      res.json({
        user,
        iat: new Date(iat * 1000).toString(),
        exp: new Date(exp * 1000).toString(),
      });
    }
  });
});

module.exports = router;
