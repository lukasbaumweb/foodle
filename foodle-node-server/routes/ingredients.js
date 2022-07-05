const express = require("express");
const {
  getAllIngredients,
  createIngredient,
  updateIngredient,
  deleteIngredient,
  getOneIngredient,
} = require("../controllers/ingredientController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

/**
 * Get all entries
 */
router.get("/", authMiddleware, getAllIngredients);

/**
 * get one entry
 */
router.get("/:id", authMiddleware, getOneIngredient);

/**
 * create one entry
 */
router.post("/", authMiddleware, createIngredient);

/**
 * update one entry
 */
router.put("/:id", authMiddleware, updateIngredient);

/**
 * delete one entry
 */
router.delete("/:id", authMiddleware, deleteIngredient);

module.exports = router;
