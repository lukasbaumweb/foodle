const Ingredient = require("./../models/Ingredient");
const Foodle = require("./../models/Foodle");
const { BadRequestError, NotAuthorizedError } = require("../utils/errors");

const getAll = (req, res, next) => {
  const page = parseInt(req.query.page, 10) || 0;
  const limit = parseInt(req.query.limit, 10) || 10;

  Foodle.find({ isPrivate: false })
    .populate("author")
    .populate({
      path: "ratings",
      populate: { path: "ratings" },
    })
    .sort("-createdAt")
    .limit(limit)
    .skip(limit * (page > 0 ? page - 1 : page))
    .exec((err, foodles) => {
      if (err) {
        next(err);
      } else {
        Foodle.count().exec((err, count) => {
          if (err) {
            logAndRespond(res, err.message, 500);
          } else {
            res.json({
              data: {
                foodles,
                page,
                pages: Math.max(1, Math.ceil(count / limit)),
                count,
              },
            });
          }
        });
      }
    });
};

const getMyFoodles = (res, req, next) => {
  const authorId = req.query.author;

  const isAuthorCurrentUser = authorId && req.user && req.user.id === authorId;
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
          next(err);
        } else {
          res.json({ data });
        }
      });
  } else next(new BadRequestError(" author or missing"));
};

const getFoodleById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  Foodle.findOne({ _id: id })
    .populate("author")
    .exec(async (err, data) => {
      if (err) {
        next(err);
      } else {
        if (!data) {
          next(new BadRequestError("Foodle does not exists"));
        } else if (
          !data.author ||
          data.author._id.toHexString() === req.user.id
        ) {
          const foodle = {
            ...data.toObject({ flattenMaps: true }),
            categories: Foodle.schema.path("category").enumValues,
          };

          console.log(foodle);

          for (let i = 0; i < foodle.ingredients.length; i++) {
            const ingredientId = foodle.ingredients[i];
            console.log(ingredientId._id.toHexString());
            const result = await Ingredient.findById(
              ingredientId._id.toHexString()
            )
              .populate({ path: "config" })
              .exec();
            foodle.ingredients[i] = result;
          }

          res.json({
            data: foodle,
          });
        } else if (data.isPrivate) {
          next(new NotAuthorizedError("Foodle is not public"));
        } else {
          next(new BadRequestError("Foodle does not exists"));
        }
      }
    });
};

const getRandomFoodle = (req, res, next) => {
  Foodle.count({ isPrivate: false }).exec((err, count) => {
    if (err) {
      next(err);
      return;
    }

    const random = Math.floor(Math.random() * count);

    Foodle.findOne({ isPrivate: false })
      .populate("author")
      .skip(random)
      .exec((err, data) => {
        if (err) {
          next(err);
        } else res.json({ data });
      });
  });
};

const getImagesById = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  Foodle.findOne({ _id: id })
    .populate("author")
    .populate("images")
    .exec((err, data) => {
      if (err) {
        next(err);
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
    next(new BadRequestError("title missing"));
    return;
  } else {
    Foodle.create({ ...req.body, author: req.user.id }, (err, data) => {
      if (err) {
        next(err);
      } else res.json({ data });
    });
  }
};

const updateFoodle = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, category, tags, ingredients, isPrivate, steps } =
    req.body;
  if (!id) {
    next(new BadRequestError("id missing"));
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
      next(err);
    } else {
      res.json({ data });
    }
  });
};

const removeIngredient = async (req, res, next) => {
  const { id, ingredientId } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  if (!ingredientId) {
    next(new BadRequestError("ingriedient id missing"));
    return;
  }

  Ingredient.deleteOne({ _id: ingredientId }, (err, data) => {
    const payload = { $pull: { ingredients: [{ _id: ingredientId }] } };

    Foodle.updateOne({ _id: id }, payload, (err, data) => {
      if (err) {
        next(err);
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
    next(new BadRequestError("id missing"));
    return;
  }

  Foodle.deleteOne({ _id: id }).then((err) => {
    if (err) {
      next(err);
    } else {
      res.json({ message: "Foodle deleted" });
    }
  });
};

module.exports = {
  getAll,
  getMyFoodles,
  getRandomFoodle,
  getFoodleById,
  getImagesById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
  removeIngredient,
};
