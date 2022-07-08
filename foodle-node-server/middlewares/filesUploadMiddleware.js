const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(`${__dirname}/../public/foodles`));
  },
  filename: (req, file, callback) => {
    const filename = `${Date.now()}-foodle-${file.originalname}`;
    callback(null, filename);
  },
});

const uploadFiles = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (match.indexOf(file.mimetype.toLowerCase()) === -1) {
      const err = new Error("Only .png, .jpg and .jpeg format allowed!");
      err.name = "ExtensionError";
      return cb(err);
    } else {
      cb(null, true);
    }
  },
}).array("files", 5);

module.exports = uploadFiles;
