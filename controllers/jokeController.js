"use strict";
const JokeModel = require('../models/jokeModel');

// Get all categories
function getCategories(req, res, next) {
  try {
    let categories = JokeModel.getCategories();
    res.render('categories', { categories: categories, title: "Categories" });
  } catch (err) {
    console.error("Error while getting categories: ", err.message);
    next(err);
  }
}

// Get jokes by category
function getJokesByCategory(req, res, next) {
  const category = req.params.category;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const categoryId = JokeModel.getCategoryIdByName(category);
    if (!categoryId) {
      return res.status(400).send("Invalid category");
    }

    const jokes = JokeModel.getJokesByCategory(categoryId, limit);
    res.render('joke-by-category', { category: category, jokes: jokes, title: `${category} Jokes` });
  } catch (err) {
    console.error("Error while getting jokes by category: ", err.message);
    next(err);
  }
}

// Get a random joke
function getRandomJoke(req, res, next) {
  try {
    const joke = JokeModel.getRandomJoke();
    res.render('random-joke', { joke: joke, title: "Random Joke" });
  } catch (err) {
    console.error("Error while getting a random joke: ", err.message);
    next(err);
  }
}

// Add a new joke
function addJoke(req, res, next) {
let category = req.body.category;
let setup = req.body.setup;
let delivery = req.body.delivery;

if (category && setup && delivery) {

  try {
    const categoryId = JokeModel.getCategoryIdByName(category);
    if (!categoryId) {
      return res.status(400).send("Invalid category");
    }

    const newJoke = JokeModel.addJoke(categoryId, setup, delivery);
    res.render('joke-by-category', {
      category: category,
      jokes: [newJoke],
      title: `${category} Jokes`,
      message: "Joke added successfully!"
    });
  } catch (err) {
    console.error("Error while adding a new joke: ", err.message);
    next(err);
  }

}
}

module.exports = {
  getCategories,
  getJokesByCategory,
  getRandomJoke,
  addJoke
};
