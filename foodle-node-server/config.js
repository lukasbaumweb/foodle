const MONGO_URI =
  process.env.NODE_ENV?.trim() === "development"
    ? process.env.MONGO_URI_DEV
    : process.env.MONGO_URI_PROD;

const config = {
  JWT_TOKEN: process.env.JWT_TOKEN,
  MONGO_URI: MONGO_URI,
};

module.exports = config;
