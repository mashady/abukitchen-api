const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
Joi.objectId = require("joi-objectid")(Joi);
const Meal = mongoose.model(
  "Meals",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: {
      type: genreSchema,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 1000,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: String,
      required: true,
    },
    featureMeal: false,
  })
);

function validateMeal(meal) {
  const schema = {
    title: Joi.string().min(5).max(50).required(),
    genreId: Joi.objectId().required(),
    description: Joi.string().min(5).max(1000).required(),
    image: Joi.string().required(),
    price: Joi.string().required(),
  };

  return Joi.validate(meal, schema);
}

exports.Meal = Meal;
exports.validate = validateMeal;
