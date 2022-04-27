const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// routes
const users = require("./routes/users");

const compression = require("compression");
const morgan = require("morgan");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(morgan("combined"));

app.use(express.static("/public"));

app.use("/api/v1/users", users);

module.exports = app;
