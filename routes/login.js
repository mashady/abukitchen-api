const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const { validateLogin } = require("../middleware/validate");
const express = require("express");
const Joi = require("@hapi/joi");
const router = express.Router();
router.get("/", async (req, res) => {
  res.send("Every Thing  Is Okay");
});
router.post("/", async (req, res) => {
  const { error } = validateLogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send(token);
});
function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  };

  return Joi.validate(req, schema);
}
module.exports = router;
