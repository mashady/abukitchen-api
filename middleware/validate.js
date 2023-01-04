const Joi = require("@hapi/joi");

function validateRegister(user) {
  const schema = {
    name: Joi.string().min(5).max(55).required(),
    email: Joi.string().min(5).max(55).required().email(),
    password: Joi.string().min(5).max(55).required(),
  };
  return Joi.validate(user, schema);
}

function validateLogin(data) {
  const schema = {
    email: Joi.string().min(5).max(55).required().email(),
    password: Joi.string().min(5).max(55).required(),
  };
  return Joi.validate(data, schema);
}

exports.validateRegister = validateRegister;
exports.validateLogin = validateLogin;
