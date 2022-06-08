const bcryptjs = require("bcryptjs");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
const { logAndRespond } = require("../utils/logging");
const router = express.Router();

/**
 * Get all users
 */
router.get("/", authMiddleware, (req, res, next) => {
  res.json({ users: [{ name: "Timmy" }] });
});

/**
 * get one user
 */
router.get("/:id", authMiddleware, (req, res, next) => {
  const { id } = req.params;
  User.findById({ _id: id }, (err, user) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
      return;
    }
    res.json({ user });
  });
});

/**
 * create one user
 */
router.post("/", authMiddleware, (req, res, next) => {
  const { id, firstName, lastName, email, username } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }
  if (!username) {
    logAndRespond(res, "username invalid or missing", 400);
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
    username,
  };
  User.create(payload, (err, user) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
      return;
    }

    res.json({ user, message: "User created successfully" });
  });
});

/**
 * update one user
 */
router.put("/", authMiddleware, (req, res, next) => {
  const { id, firstName, lastName, email, password } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  if (!password) {
    logAndRespond(res, "password is missing", 500);
    return;
  }
  const payload = {
    firstName,
    lastName,
    email,
  };
  User.findById(id, "+password", (err, user) => {
    if (err || user === null) {
      console.error(err);
      res.json({ error: err });
      return;
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (isMatch) {
      User.updateOne({ _id: id }, payload, (err, user) => {
        if (err) {
          console.error(err);
          res.json({ error: err });
          return;
        }
        res.json({ user, message: "User updated successfully" });
      });
    } else {
      res.json({ error: "Password incorrect" });
    }
  });
});

/**
 * delete one user
 */
router.delete("/:id", authMiddleware, (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  User.deleteOne({ _id: id }, (err, user) => {
    if (err) {
      console.error(err);
      res.json({ error: err });
      return;
    }
    res.json({ user, message: "User updated successfully" });
  });
});

module.exports = router;
