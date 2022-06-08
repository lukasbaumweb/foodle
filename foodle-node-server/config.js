const MONGO_URI =
  process.env.NODE_ENV?.trim() === "development"
    ? "mongodb://127.0.0.1:27017/foodle?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.3.1"
    : process.env.MONGO_URI;

const config = {
  JWT_TOKEN: process.env.JWT_TOKEN,
  MONGO_URI: MONGO_URI,
};

module.exports = config;
