const bcryptjs = require("bcryptjs");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const User = require("../models/User");
const { BadRequestError, NotFoundError } = require("../utils/errors");

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

  if (!id) {
    next(new BadRequestError("id invalid or missing"));
    return;
  }

  User.findById({ _id: id }, (err, user) => {
    if (err) {
      next(err);
    } else {
      res.json({ user });
    }
  });
});

/**
 * create one user
 */
router.post("/", authMiddleware, (req, res, next) => {
  const { id, firstName, lastName, email } = req.body;
  if (!id) {
    next(new BadRequestError("id invalid or missing"));
    return;
  }
  if (!email) {
    next(new BadRequestError("email invalid or missing"));
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
  };
  User.create(payload, (err, user) => {
    if (err) {
      next(err);
    } else res.json({ user, message: "User created successfully" });
  });
});

/**
 * update one user
 */
router.put("/", authMiddleware, (req, res, next) => {
  const { id, firstName, lastName, email, password } = req.body;
  if (!id) {
    next(new BadRequestError("id invalid or missing"));
    return;
  }

  if (!password) {
    next(new BadRequestError("password missing"));
    return;
  }

  const payload = {
    firstName,
    lastName,
    email,
  };
  User.findById(id, "+password", (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (user === null) {
      next(new NotFoundError("user not found"));
      return;
    }

    const isMatch = bcryptjs.compareSync(password, user.password);
    if (isMatch) {
      User.updateOne({ _id: id }, payload, (err, user) => {
        if (err) {
          next(err);
        } else res.json({ user, message: "User updated successfully" });
      });
    } else next(new BadRequestError("password incorrect"));
  });
});

/**
 * delete one user
 */
router.delete("/:id", authMiddleware, (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    next(new BadRequestError("id invalid or missing"));
    return;
  }

  User.deleteOne({ _id: id }, (err, user) => {
    if (err) {
      next(err);
    } else res.json({ user, message: "User updated successfully" });
  });
});

module.exports = router;
