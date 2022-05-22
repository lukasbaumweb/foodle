require("dotenv").config();

//
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const compression = require("compression");
const mongoose = require("mongoose");

// Router
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const foodlesRouter = require("./routes/foodles");
const authRouter = require("./routes/auth");
const { MONGO_URI } = require("./config");

const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use(compression());

// Routes
app.use("/", indexRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", usersRouter);
app.use("/api/v1/foodle", foodlesRouter);

mongoose
  .connect(MONGO_URI, {
    autoIndex: process.env.NODE_ENV === "development",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.info("Database connected to: " + MONGO_URI);
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = app;
