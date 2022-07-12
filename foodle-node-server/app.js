require("dotenv").config();

const express = require("express");
const path = require("path");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cloudinary = require("cloudinary");

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const foodlesRouter = require("./routes/foodles");
const authRouter = require("./routes/auth");
const filesRouter = require("./routes/files");
const ingredientRouter = require("./routes/ingredients");
const configRouter = require("./routes/configs");
const changeRouter = require("./routes/changes");
const { MONGO_URI } = require("./config");
const errorController = require("./controllers/errorController");

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(compression());
app.use(fileUpload());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

// Config
app.options("*", cors());

// Routes
app.use("/", indexRouter);
app.use("/api/v1/", indexRouter);
app.use("/api/v1/auth", limiter, authRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/foodle", foodlesRouter);
app.use("/api/v1/files", filesRouter);
app.use("/api/v1/ingredient", ingredientRouter);
app.use("/api/v1/config", configRouter);
app.use("/api/v1/changes", changeRouter);

app.use(errorController);

if (process.env.CLOUDINARY_CLOUD_NAME) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_APP_SECRET,
  });
}

mongoose
  .connect(MONGO_URI, {
    autoIndex: process.env.NODE_ENV === "development",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Database connected: " + MONGO_URI);
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
