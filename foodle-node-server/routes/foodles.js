const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { logAndRespond } = require("../utils/logging");
const router = express.Router();

const Foodle = require("./../models/Foodle");

/**
 * Get all entries
 */
router.get("/", authMiddleware, (req, res, next) => {
  Foodle.find()
    .populate("author")
    .populate({
      path: "ratings",
      populate: { path: "ratings" },
    })
    .exec((err, data) => {
      if (err) {
        logAndRespond(res, "Error occured", 500);
      } else {
        res.json({ data });
      }
    });
});

/**
 * get one entry
 */
router.get("/", authMiddleware, (req, res, next) => {
  const { id } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  Foodle.findOne({ _id: id })
    .populate("author")
    .exec((err, data) => {
      if (err) {
        logAndRespond(res, "Error occured", 500);
      } else {
        res.json({ data });
      }
    });
});

/**
 * create one entry
 */
router.post("/", authMiddleware, (req, res, next) => {
  const { title, ingredients, difficulty, tutorial } = req.body;

  const payload = validate(req.user, title, ingredients, difficulty, tutorial);

  if (payload._errors) {
    logAndRespond(res, payload._errors.join(", "), 400);
  } else {
    Foodle.create(payload, (err, data) => {
      console.log(data, err);
      if (err) {
        logAndRespond(res, "Error occured", 500);
      } else {
        res.json({ data });
      }
    });
  }
});

/**
 * update one entry
 */
router.put("/", authMiddleware, (req, res, next) => {
  const { id, title, ingredients, difficulty, tutorial } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  const payload = validate(req.user, title, ingredients, difficulty, tutorial);

  Foodle.updateOne({ _id: id }, payload, (err, data) => {
    if (err) {
      logAndRespond(res, "Error occured", 500);
    } else {
      res.json({ data });
    }
  });
});

/**
 * delete one entry
 */
router.delete("/:id", authMiddleware, (req, res, next) => {
  res.json({ error: "Not implemented" });
});

const validate = (user, title, ingredients, difficulty, tutorial) => {
  const result = {};

  if (user) {
    result["author"] = user.id;
  }

  if (title && title.length > 0) {
    result["title"] = title;
  } else {
    result["_errors"] = ["title required"];
  }

  if (ingredients && ingredients.length > 0) {
    result["ingredients"] = ingredients;
  }

  if (difficulty && parseFloat(difficulty) > 0) {
    result["difficulty"] = difficulty;
  }

  if (tutorial) {
    if (typeof tutorial === "string") tutorial = JSON.stringify(tutorial);
    result["tutorial"] = tutorial;
  }

  return result;
};

module.exports = router;
