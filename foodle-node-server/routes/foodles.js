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
  getPublicFoodle,
} = require("../controllers/foodleController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", getAll);
router.get("/type/random", getRandomFoodle);
router.get("/type/public/:id", getPublicFoodle);
router.get("/author/my", authMiddleware, getMyFoodles);
router.get("/:id", authMiddleware, getFoodleById);
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
