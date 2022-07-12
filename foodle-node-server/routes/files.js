const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  uploadImages,
  deleteImageById,
} = require("../controllers/filesController");

router.post("/foodle/:id", authMiddleware, uploadImages);
router.delete("/:id/:imageId", authMiddleware, deleteImageById);

module.exports = router;
