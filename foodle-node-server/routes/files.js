const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getSizeFile } = require("../utils/fileUpload");
const router = express.Router();
const Foodle = require("../models/Foodle.js");
const File = require("../models/File.js");
const path = require("path");
const { BadRequestError } = require("../utils/errors");

/**
 * update one entry
 */
router.post("/foodle/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new BadRequestError(("id missing")));

    return;
  }

  const images = req.files?.images;

  console.log(images, req.files, req.images);

  const payload = {};

  try {
    if (images) {
      const files = [];
      const timestamp = new Date().getTime();

      for (let i = 0; i < images.length; i++) {
        try {
          const element = images[i];

          const uniqueFileName = `${id}-${timestamp}-${element.name}`;
          const filePath = path.join(
            __dirname,
            "..",
            "public",
            "foodles",
            uniqueFileName
          );

          const file = new File({
            title: element.title,
            name: element.name,
            type: element.mimetype,
            path: element.path,
            storedName: uniqueFileName,
            size: getSizeFile(element.size, 2),
            storedAt: filePath,
            order: i,
          });

          element.mv(filePath);

          const savedFile = await file.save();

          files.push(savedFile);
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
      payload["files"] = files;
    }

    Foodle.updateOne({ _id: id }, payload, (err, data) => {
      if (err) {
        next(err);
      } else {
        // TODO: add file paths
        res.json({ data: "Files uploaded" });
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
