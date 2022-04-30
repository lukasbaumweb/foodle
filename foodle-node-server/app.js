require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const compression = require("compression");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

// routes
const users = require("./routes/users");
const auth = require("./routes/auth");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

const corsOptions = {
  origin: `http://localhost:${process.env.PORT || 3100}`,
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

app.use(morgan("combined"));

app.use(express.static("/public"));

app.use("/api/v1/users", users);
app.use("/api/v1/auth", auth);

module.exports = app;
