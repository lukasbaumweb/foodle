const express = require("express");
const {
  getAll,
  getFoodleById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
  getImagesById,
  removeIngredient,
} = require("../controllers/foodleController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Get all entries
 */
router.get("/", authMiddleware, getAll);

/**
 * get one entry or random entry
 */
router.get("/:id", authMiddleware, getFoodleById);

/**
 * get images by id
 */
router.get("/images/:id", authMiddleware, getImagesById);

/**
 * get one entry or random entry
 */
router.delete("/ingredient/:id/:ingredientId", authMiddleware, removeIngredient);

/**
 * create one entry
 */
router.post("/", authMiddleware, createFoodle);

/**
 * update one entry
 */
router.put("/:id", authMiddleware, updateFoodle);

/**
 * delete one entry
 */
router.delete("/:id", authMiddleware, deleteFoodle);

module.exports = router;
