const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const login = require("../routes/login");
const register = require("../routes/register");
const genres = require("../routes/genres");
const meals = require("../routes/meals");
module.exports = function (app) {
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.urlencoded({ extended: false, useNewUrlParser: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.json());
  app.use("/api/login", login);
  app.use("/api/register", register);
  app.use("/api/genres", genres);
  app.use("/api/meals", meals);
};
