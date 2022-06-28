const { logAndRespond } = require("../utils/logging");
const Foodle = require("./../models/Foodle");

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

const getAll = (req, res, next) => {
  Foodle.find()
    .populate("author")
    .populate({
      path: "ratings",
      populate: { path: "ratings" },
    })
    .exec((err, data) => {
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        res.json({ data });
      }
    });
};

const getFoodleById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  if (id === "random") {
    Foodle.count({ isPrivate: false }).exec(function (err, count) {
      if (err) {
        logAndRespond(res, err.message, 500);

        return;
      }

      const random = Math.floor(Math.random() * count);

      Foodle.findOne({ isPrivate: false })
        .populate("author")
        .skip(random)
        .exec((err, data) => {
          if (err) {
            logAndRespond(res, err.message, 500);
          } else {
            res.json({ data });
          }
        });
    });
  } else {
    Foodle.findOne({ _id: id })
      .populate("author")
      .exec((err, data) => {
        if (err) {
          logAndRespond(res, err.message, 500);
        } else {
          res.json({ data });
        }
      });
  }
};

const getImagesById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  Foodle.findOne({ _id: id })
    .populate("author")
    .populate("images")
    .exec((err, data) => {
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        const publicFolder =
          req.protocol + "://" + req.get("host") + "/foodles/";

        const images = [
          ...data.images
            .map((image) => ({
              ...image._doc,
              publicUrl: publicFolder + image._doc.storedName,
            }))
            .sort((a, b) => a.order - b.order),
        ];

        res.json({ data: { images } });
      }
    });
};

const createFoodle = (req, res) => {
  const { title, ingredients, difficulty, tutorial } = req.body;

  const payload = validate(req.user, title, ingredients, difficulty, tutorial);

  if (payload._errors) {
    logAndRespond(res, payload._errors.join(", "), 400);
  } else {
    Foodle.create(payload, (err, data) => {
      console.log(data, err);
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        res.json({ data });
      }
    });
  }
};

const updateFoodle = (req, res, next) => {
  const { id, title, ingredients, difficulty, tutorial } = req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }

  const payload = validate(req.user, title, ingredients, difficulty, tutorial);

  Foodle.updateOne({ _id: id }, payload, (err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

const deleteFoodle = (req, res, next) => {
  const { id } = req.params;
  const { imageId } = req.body;
  console.log(imageId);

  if (!id) {
    logAndRespond(res, "id invalid or missing", 500);
    return;
  }
  // Foodle.deleteOne({ _id: id }).then((err) => {
  //   if (err) {
  //     logAndRespond(res, err.message, 500);
  //   } else {
  //     res.json({ message: "Foodle deleted" });
  //   }
  // });
};

module.exports = {
  getAll,
  getFoodleById,
  getImagesById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
};
