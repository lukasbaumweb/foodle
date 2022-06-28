const express = require("express");
const {
  getAll,
  getFoodleById,
  createFoodle,
  updateFoodle,
  deleteFoodle,
  getImagesById,
} = require("../controllers/foodleController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * Get all entries
 */
router.get("/", getAll);

/**
 * get one entry or random entry
 */
router.get("/:id", getFoodleById);

/**
 * get one entry or random entry
 */
router.get("/images/:id", getImagesById);

/**
 * create one entry
 */
router.post("/", authMiddleware, createFoodle);

/**
 * update one entry
 */
router.put("/", authMiddleware, updateFoodle);

/**
 * delete one entry
 */
router.delete("/:id", authMiddleware, deleteFoodle);

module.exports = router;
