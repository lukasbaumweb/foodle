const Ingredient = require("./../models/Ingredient");
const Foodle = require("./../models/Foodle");
const { logAndRespond } = require("../utils/logging");

const getAll = (req, res, next) => {
  const authorId = req.query.author;
  const pagingParam = req.query.page || new Date();
  const limit = req.query.limit || 25;

  const isAuthorCurrentUser = authorId && req.user.id === authorId;
  if (isAuthorCurrentUser) {
    Foodle.find({ author: req.user.id })
      .populate("author")
      .populate({
        path: "ratings",
        populate: { path: "ratings" },
      })
      .populate({
        path: "ingredients",
        populate: { path: "ingredient", model: Ingredient },
      })
      .exec((err, data) => {
        if (err) {
          logAndRespond(res, err.message, 500);
        } else {
          res.json({ data });
        }
      });
  } else {
    Foodle.find({ createdAt: { $lte: pagingParam }, isPrivate: false })
      .populate("author")
      .populate({
        path: "ratings",
        populate: { path: "ratings" },
      })
      .limit(limit)
      .sort("-createdAt")
      .exec((err, data) => {
        if (err) {
          logAndRespond(res, err.message, 500);
        } else {
          res.json({ data });
        }
      });
  }
};

const getFoodleById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
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
      .populate({
        path: "ingredients",
        model: Ingredient,
      })
      .exec((err, data) => {
        if (err || !data) {
          logAndRespond(
            res,
            err?.message || "Foodle does not exists",
            err ? 500 : 404
          );
        } else {
          if (data.author._id.toHexString() === req.user.id) {
            data.ingredients.map((ingredient) => {
              return ingredient;
            });

            res.json({ data });
          } else if (data.isPrivate) {
            res
              .status(401)
              .json({ message: "Foodle does not exists or it is not public" });
          }
        }
      });
  }
};

const getImagesById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
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

        const images = data?.images
          .map((image) => ({
            ...image._doc,
            publicUrl: publicFolder + image._doc.storedName,
          }))
          .sort((a, b) => a.order - b.order);

        res.json({ data: { images } });
      }
    });
};

const createFoodle = (req, res) => {
  const { title } = req.body;
  if (!title) {
    logAndRespond(res, "title is missing", 400);
  } else {
    Foodle.create({ ...req.body, author: req.user.id }, (err, data) => {
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        res.json({ data });
      }
    });
  }
};

const updateFoodle = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, category, tags, ingredients, isPrivate, steps } =
    req.body;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }
  const payload = { title, description, category, tags, isPrivate, steps };
  if (ingredients) {
    const data = await Ingredient.create(ingredients);

    payload["$push"] = {
      ingredients: data[0],
    };
  }
  Foodle.updateOne({ _id: id }, payload, (err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ data });
    }
  });
};

const removeIngredient = async (req, res, next) => {
  const { id, ingredientId } = req.params;
  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }

  if (!ingredientId) {
    logAndRespond(res, "ingredientId invalid or missing", 400);
    return;
  }

  Ingredient.deleteOne({ _id: ingredientId }, (err, data) => {
    const payload = { $pull: { ingredients: [{ _id: ingredientId }] } };

    Foodle.updateOne({ _id: id }, payload, (err, data) => {
      if (err) {
        logAndRespond(res, err.message, 500);
      } else {
        res.json({ data });
      }
    });
  });
};

const deleteFoodle = (req, res, next) => {
  const { id } = req.params;
  const { imageId } = req.body;
  console.log(imageId);

  if (!id) {
    logAndRespond(res, "id invalid or missing", 400);
    return;
  }
  Foodle.deleteOne({ _id: id }).then((err) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      res.json({ message: "Foodle deleted" });
    }
  });
};

module.exports = {
  getAll,
  getFoodleById,
  getImagesById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
  removeIngredient,
};
