const Config = require("../models/Config");

const getConfig = (req, res, next) => {
  const { entity } = req.params;
  Config.find({ type: entity }).exec((err, data) => {
    if (err) {
      logAndRespond(res, err.message, 500);
    } else {
      const config = {};
      data.forEach((item) => (config[item._id] = item));

      res.json({ data: config });
    }
  });
};

module.exports = { getConfig };
