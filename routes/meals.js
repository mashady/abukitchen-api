const { Meal, validate } = require("../models/meal");
const { Genre } = require("../models/genre");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const meals = await Meal.find().select("-__v").sort("name");
  res.send(meals);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let mealTitle = await Meal.findOne({ title: req.body.title });
  if (mealTitle) return res.status(400).send("Meal Already Added.");

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const meal = new Meal({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
  });
  await meal.save();

  res.send(meal);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Invalid genre.");

  const meal = await Meal.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      description: req.body.description,
      image: req.body.image,
      price: req.body.price,
    },
    { new: true }
  );

  if (!meal)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(meal);
});

router.delete("/:id", async (req, res) => {
  const meal = await Meal.findByIdAndRemove(req.params.id);

  if (!meal)
    return res.status(404).send("The meal with the given ID was not found.");

  res.send(meal);
});

router.get("/:id", async (req, res) => {
  const meal = await Meal.findById(req.params.id).select("-__v");

  if (!meal)
    return res.status(404).send("The meal with the given ID was not found.");

  res.send(meal);
});

module.exports = router;
