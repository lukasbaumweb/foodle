const Foodle = require("../models/Foodle");
const File = require("../models/File");
const { getSizeFile } = require("../utils/fileUpload");
const path = require("path");
const cloudinary = require("cloudinary");
const { bytesToBase64 } = require("byte-base64");

const addHTTPS = (url) => url.replace("http:", "https:");

const uploadImages = async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  const images = Array.isArray(req.files.files)
    ? req.files.files
    : [req.files.files];

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

          const base64 = bytesToBase64(element.data);
          const baseString = `data:image/png;base64,${base64}`;

          try {
            let result = {};
            if (process.env.CLOUDINARY_CLOUD_NAME) {
              result = await cloudinary.v2.uploader.upload(baseString, {
                public_id: uniqueFileName,
                folder: "foodles",
              });
            }

            const file = new File({
              name: element.name,
              type: element.mimetype,
              path: element.path,
              storedName: uniqueFileName,
              size: getSizeFile(element.size, 2),
              storedAt: filePath,
              publicUrl: addHTTPS(result.url),
              cloudinaryId: result.public_id,
              order: i,
            });
            const savedFile = await file.save();

            files.push(savedFile);
          } catch (err) {
            console.error(err);
          }
        } catch (err) {
          console.error(err);
          next(err);
        }
      }
      payload["images"] = files;
    }

    Foodle.updateOne({ _id: id }, payload, (err, data) => {
      if (err) {
        next(err);
      } else {
        res.json({ data: data });
      }
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteImageById = async (req, res, next) => {
  const { id, imageId } = req.params;
  if (!id) {
    next(new BadRequestError("id missing"));
    return;
  }

  if (!imageId) {
    next(new BadRequestError("imageId missing"));
    return;
  }

  const result = await File.findById(imageId).exec();

  try {
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      await cloudinary.uploader.destroy(result.cloudinaryId);
    }
    await File.deleteOne({ _id: imageId }).exec();
  } catch (err) {
    console.error(err);
  }

  Foodle.updateOne(
    { _id: id },
    {
      $pullAll: {
        images: [{ _id: imageId }],
      },
    },
    (err, data) => {
      if (err) {
        next(err);
      } else {
        res.json({ data: data });
      }
    }
  );
};

module.exports = { uploadImages, deleteImageById };
