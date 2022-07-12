const express = require("express");
const {
  getAll,
  getMyFoodles,
  getFoodleById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
  getImagesById,
  removeIngredient,
  getRandomFoodle,
  getAllByFilter,
} = require("../controllers/foodleController");
const authMiddleware = require("../middlewares/authMiddleware");
const checkUserMiddleware = require("../middlewares/checkUserMiddleware");

const router = express.Router();

router.get("/", getAll);
router.get("/query/all", getAllByFilter);
router.get("/type/random", getRandomFoodle);
router.get("/author/my", authMiddleware, getMyFoodles);
router.get("/:id", checkUserMiddleware, getFoodleById);
router.get("/images/:id", authMiddleware, getImagesById);
router.delete(
  "/ingredient/:id/:ingredientId",
  authMiddleware,
  removeIngredient
);
router.post("/", authMiddleware, createFoodle);
router.put("/:id", authMiddleware, updateFoodle);
router.delete("/:id", authMiddleware, deleteFoodle);

module.exports = router;
