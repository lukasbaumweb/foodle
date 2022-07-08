const util = require("util");
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { getSizeFile } = require("../utils/fileUpload");
const router = express.Router();
const Foodle = require("../models/Foodle.js");
const File = require("../models/File.js");
const path = require("path");
const { BadRequestError } = require("../utils/errors");
const uploadFiles = require("../middlewares/filesUploadMiddleware");

/**
 * update one entry
 */
router.post("/foodle/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));

    return;
  }

  try {
    const filesUploadMiddleWare = util.promisify(uploadFiles);

    await filesUploadMiddleWare(req, res);
    console.log(req.files);
    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }
    return res.send(`Files has been uploaded.`);
  } catch (error) {
    console.log(error);
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }

  // const images = req.files;

  // console.log(req.files);

  // const payload = {};

  // try {
  //   if (images) {
  //     const files = [];
  //     const timestamp = new Date().getTime();

  //     for (let i = 0; i < images.length; i++) {
  //       try {
  //         const element = images[i];

  //         const uniqueFileName = `${id}-${timestamp}-${element.name}`;
  //         const filePath = path.join(
  //           __dirname,
  //           "..",
  //           "public",
  //           "foodles",
  //           uniqueFileName
  //         );

  //         const file = new File({
  //           title: element.title,
  //           name: element.name,
  //           type: element.mimetype,
  //           path: element.path,
  //           storedName: uniqueFileName,
  //           size: getSizeFile(element.size, 2),
  //           storedAt: filePath,
  //           order: i,
  //         });

  //         element.mv(filePath);

  //         const savedFile = await file.save();

  //         files.push(savedFile);
  //       } catch (err) {
  //         console.error(err);
  //         next(err);
  //       }
  //     }
  //     payload["files"] = files;
  //   }

  //   Foodle.updateOne({ _id: id }, payload, (err, data) => {
  //     if (err) {
  //       next(err);
  //     } else {
  //       // TODO: add file paths
  //       res.json({ data: "Files uploaded" });
  //     }
  //   });
  // } catch (err) {
  //   console.error(err);
  //   next(err);
  // }
});

module.exports = router;
